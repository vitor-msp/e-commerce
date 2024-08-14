export interface IJwtGenerator {
  generate(payload: any, expiresIn: string | number): string;
}
