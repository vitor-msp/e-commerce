export interface IPasswordEncryptor {
  generateHash(plainText: string): string;
  compare(plainText: string, hash: string): boolean;
}
