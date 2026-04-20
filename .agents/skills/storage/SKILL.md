# Storage & Media Management - Skill File

Advanced standards for S3-compatible storage, image processing with Sharp, and Kafka-driven uploads.

## 🏗️ 1. Architecture (Hybrid Upload)

- **Engine**: S3-compatible (supports dual endpoints: internal for ops, external for presigning).
- **Synchronous**: Direct upload via `uploadFile(..., true)`. Use for small files (avatars).
- **Asynchronous**: Produces a `STORAGE_UPLOAD` event with a presigned PUT URL. Use for high-volume or heavy processing.

## 🖼️ 2. Image Processing Standards (Sharp)

- **Mandatory Conversion**: All images are converted to **WebP**.
- **Compression**: 80% quality default.
- **Resizing**: Fit inside **2000x2000** without enlargement.
- **Format**: All processed images use `image/webp` MIME type.

## 🔐 3. Security & Access

- **Presigned URLs**: NEVER store absolute URLs in the DB. Store the `s3Key`.
- **Expiration**: Generate temporary access links using `getPresignedUrl()` (1 hour default).

## 🔄 4. Media Lifecycle

- **Entity**: `Media` tracks status (`PENDING`, `COMPLETED`, `FAILED`).
- **Deletion**: Always call `deleteFile(mediaId)`. It handles object removal AND DB record cleanup (including foreign key checks).

## 🔗 5. References

- [CONTROLLER.md](./references/CONTROLLER.md) (Decorators, Pipes, API Boundary)
- [SERVICE.md](./references/SERVICE.md) (Internal logic, Uploader, Presigner)
- `src/services/storage/entities/media.entity.ts` (Data Structure)
