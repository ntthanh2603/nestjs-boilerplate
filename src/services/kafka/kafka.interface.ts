export type KafkaDeadLetterPayload<T = unknown> = {
  originalPayload: T | string;
  error: string;
  stack?: string;
  topic: string;
  partition: number;
  offset: string;
  failedAt: string;
};
