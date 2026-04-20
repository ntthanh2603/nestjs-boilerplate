import type { KafkaDeadLetterPayload } from '../kafka/kafka.interface';

/**
 * Interface cho chuẩn Payload của toàn hệ thống Mail
 */
export type MailEventPayload = {
  pattern: 'send-otp' | 'send-password-reset' | 'send-verification-email';
  data: {
    email: string;
    otp?: string;
    url?: string;
  };
  metadata?: {
    source: string;
    timestamp: number;
  };
};

/**
 * Interface cho Dead Letter Queue của Mail
 */
export type MailDeadLetterPayload = KafkaDeadLetterPayload<MailEventPayload>;
