# Testing Patterns & Mocking - Skill File

Code snippets and patterns for writing effective tests in `nest-base`.

## 1. Mocking External Services

### Mocking Kafka
```typescript
const mockKafkaService = {
  emit: jest.fn().mockImplementation(() => ({
    toPromise: jest.fn().mockResolvedValue({}),
  })),
};
```

### Mocking TypeORM Repository
```typescript
const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn().mockImplementation((dto) => dto),
};
```

## 2. AAA Pattern (Arrange, Act, Assert)
```typescript
it('should create a new user', async () => {
  // Arrange
  const dto = { email: 'test@example.com' };
  mockRepository.save.mockResolvedValue({ id: 'uuid', ...dto });

  // Act
  const result = await service.create(dto);

  // Assert
  expect(result).toBeDefined();
  expect(result.id).toBe('uuid');
  expect(mockRepository.save).toHaveBeenCalledWith(dto);
});
```

## 3. Testing Exceptions
```typescript
it('should throw error if user exists', async () => {
  mockRepository.findOne.mockResolvedValue({ id: 'exists' });
  
  await expect(service.create(dto)).rejects.toThrow(BusinessException);
});
```

## 4. E2E Setup
Use `createTestingModule` with `supertest`. Ensure the DB is cleaned up after each run if using a real test DB.

## 5. References
- `test.md` workflow
- `*.service.spec.ts` files in codebase
