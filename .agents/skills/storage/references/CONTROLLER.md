# Storage Controller Components (v7 - The Smart Duo)

Simplified decorators: Only **ApiFile** and **ApiFiles** are needed.

---

## 🟢 1. Single File Upload (`@ApiFile`)
Use for endpoints that accept exactly **ONE** file.

```typescript
@ApiFile('avatar', UpdateDto)
async upload(@UploadedFile() file: Express.Multer.File) { ... }
```

---

## 🔵 2. Multiple Files / Multiple Fields (`@ApiFiles`)
A smart decorator that handles both multiple files in one field and multiple named fields.

### **Pattern A: Single Field - Multiple Files**
Pass a **String** as the first argument.
```typescript
@ApiFiles('photos', 5, UpdateDto) // field name, max count, DTO
async upload(@UploadedFiles() files: Express.Multer.File[]) { ... }
```

### **Pattern B: Multiple Named Fields**
Pass an **Array** as the first argument.
```typescript
@ApiFiles([
  { name: 'avatar', maxCount: 1 },
  { name: 'photos', maxCount: 4 }
], UpdateDto) // Field definitions, DTO
async upload(@UploadedFiles() files: { avatar?: Express.Multer.File[], photos?: ... }) { ... }
```

---

## 💡 Universal Rules
1. **Swagger Select**: Always add `request: { bodyType: 'FORM_DATA' }` inside `@Doc`.
2. **DTO Merging**: Always pass the DTO class to the decorator to keep Swagger fields.
3. **Usage**:
   - `@ApiFile` -> uses `@UploadedFile()` (singular)
   - `@ApiFiles` -> uses `@UploadedFiles()` (plural)
