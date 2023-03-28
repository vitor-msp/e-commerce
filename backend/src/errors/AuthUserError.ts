export class AuthUserUseCaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthUserControllerError extends Error {
  constructor(message: string) {
    super(message);
  }
}