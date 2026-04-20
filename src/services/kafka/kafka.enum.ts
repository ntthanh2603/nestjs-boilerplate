export enum KafkaTopic {
  AUTH_MAIL = 'auth.mail',
  AUTH_MAIL_DLQ = 'auth.mail.dlq',
  STORAGE_UPLOAD = 'storage.upload',
  STORAGE_DELETE = 'storage.delete',
}

export enum KafkaConsumerGroup {
  AUTH_MAIL = 'auth.mail.group',
  STORAGE_UPLOAD = 'storage.upload.group',
  STORAGE_DELETE = 'storage.delete.group',
}
