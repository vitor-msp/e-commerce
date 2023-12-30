import { ApplicationError } from "../../src/errors/ApplicationError";
import { AuthUserInput } from "../../src/use-cases/auth-user/AuthUserInput";

describe("Auth User Input Tests", () => {
  it("should throw error when missing email", () => {
    const input = { password: "password" };
    expect(() => new AuthUserInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when email is empty", () => {
    const input = { email: "", password: "password" };
    expect(() => new AuthUserInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when missing password", () => {
    const input = { email: "email@teste.com" };
    expect(() => new AuthUserInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when password is empty", () => {
    const input = { email: "email@teste.com", password: "" };
    expect(() => new AuthUserInput(input)).toThrow(ApplicationError);
  });
});
