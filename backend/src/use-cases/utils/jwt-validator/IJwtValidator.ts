export interface IJwtValidator {
  getContent(jwt: string, ifValid?: boolean): Promise<string>;
}
