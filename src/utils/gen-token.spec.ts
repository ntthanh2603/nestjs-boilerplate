import { generateSecureToken } from './gen-token';

describe('generateSecureToken', () => {
  it('should generate a 64-character hex string', () => {
    const token = generateSecureToken();
    expect(token).toHaveLength(64);
    expect(token).toMatch(/^[0-9a-f]{64}$/);
  });

  it('should generate unique tokens', () => {
    const token1 = generateSecureToken();
    const token2 = generateSecureToken();
    expect(token1).not.toBe(token2);
  });
});
