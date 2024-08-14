import { AxiosError } from "axios";

export class UnauthorizedError extends Error {
  public constructor(message?: string) {
    super(
      message ?? "Usuário não autenticado. Gentileza fazer o login novamente!"
    );
  }
}

export const errorIsUnauthorized = (error: any): boolean => {
  const UNAUTHORIZED = 401;
  return (
    error instanceof AxiosError &&
    (error as AxiosError).response?.status === UNAUTHORIZED
  );
};
