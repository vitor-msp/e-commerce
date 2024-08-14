export interface IJwtValidator {
  validate(jwt: string): Promise<string>;
}
