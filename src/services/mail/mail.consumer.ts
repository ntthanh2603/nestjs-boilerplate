import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '@/services/kafka/kafka.service';
import { MailService } from './mail.service';
import { EachMessageHandler } from 'kafkajs';
import { KafkaConsumerGroup, KafkaTopic } from '../kafka/kafka.enum';
import { LoggerService } from '@/commons/logger/logger.service';
import type { MailEventPayload, MailDeadLetterPayload } from './mail.interface';

@Injectable()
export class MailConsumer implements OnModuleInit {
  private readonly logger = new LoggerService(MailConsumer.name);

  constructor(
    private readonly kafkaService: KafkaService,
    private readonly mailService: MailService,
  ) {}

  async onModuleInit() {
    // Register Consumer with auto commit offset mechanism of KafkaJS
    await this.kafkaService.consume(
      KafkaTopic.AUTH_MAIL,
      KafkaConsumerGroup.AUTH_MAIL,
      this.handleMessage,
    );
    this.logger.log(
      `Mail Consumer initialized and listening on topic: ${KafkaTopic.AUTH_MAIL}`,
    );
  }

  private handleMessage: EachMessageHandler = async ({
    topic,
    partition,
    message,
  }) => {
    if (!message.value) return;

    const rawValue = message.value.toString();
    const offset = message.offset;

    try {
      const payload = JSON.parse(rawValue) as MailEventPayload;
      const { pattern, data, metadata } = payload;

      // Log latency check
      if (metadata?.timestamp) {
        const latency = Date.now() - metadata.timestamp;
        if (latency > 10000) {
          this.logger.warn(
            `High latency detected for ${pattern}: ${latency}ms`,
          );
        }
      }

      this.logger.log(
        `[P:${partition}][Offset:${offset}] Processing ${pattern} for ${data.email}`,
      );

      switch (pattern) {
        case 'send-otp':
          if (!data.otp) throw new Error('Missing OTP code in payload');
          await this.mailService.sendOtp(data.email, data.otp);
          break;
        case 'send-password-reset':
          if (!data.url) throw new Error('Missing Reset URL in payload');
          await this.mailService.sendPasswordReset(data.email, data.url);
          break;
        case 'send-verification-email':
          if (!data.url) throw new Error('Missing Verification URL in payload');
          await this.mailService.sendVerificationEmail(data.email, data.url);
          break;
        default:
          this.logger.warn(
            `Unknown mail pattern received: ${pattern as string}`,
          );
      }
    } catch (error) {
      this.logger.error(
        `Failed to process mail message at offset ${offset} on topic ${topic}`,
        error instanceof Error ? error.stack : error,
      );

      // Apply Dead Letter Queue (DLQ)
      const dlqPayload: MailDeadLetterPayload = {
        originalPayload: rawValue,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        topic,
        partition,
        offset,
        failedAt: new Date().toISOString(),
      };

      await this.kafkaService.produce(KafkaTopic.AUTH_MAIL_DLQ, [
        {
          key: message.key?.toString(),
          value: JSON.stringify(dlqPayload),
        },
      ]);
    }
  };
}
