export interface IJwtGenerator {
  generate(payload: any): string;
}
