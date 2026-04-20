# Storage Implementation Patterns

## 📂 Synchronous Upload (Standard)
```typescript
const media = await this.storageService.uploadFile({
  buffer: file.buffer,
  originalname: file.originalname,
  mimetype: file.mimetype,
  size: file.size,
}, true, StoragePath.AVATARS);
```

## ⚡ Asynchronous Upload (High Performance)
```typescript
const pendingMedia = await this.storageService.uploadFile({
  buffer: null, // Buffer is not needed for async link gen
  // ... metadata
}, false, StoragePath.UPLOADS);
// This produces a STORAGE_UPLOAD event for the consumer to process later.
```

## 🔗 Generating Access Links
```typescript
const url = await this.storageService.getPresignedUrl(media.s3Key);
```

## 🗑️ Safe Deletion
```typescript
await this.storageService.deleteFile(mediaId);
// Automates: check exists -> delete S3 -> delete DB record.
```
