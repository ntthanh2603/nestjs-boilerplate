import type { KafkaDeadLetterPayload } from '../kafka/kafka.interface';

export type StorageUploadMessage = {
  mediaId: string;
  sourceKey: string;
  mimeType: string;
  filename: string;
  folder: string;
};

export type StorageDeadLetterPayload =
  KafkaDeadLetterPayload<StorageUploadMessage>;
