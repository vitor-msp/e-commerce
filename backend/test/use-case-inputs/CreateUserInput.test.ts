import { CreateUserInput } from "../../src/domain/services/create-user/CreateUserInput";
import { DomainError } from "../../src/errors/DomainError";

describe("Create User Input Tests", () => {
  it("should throw error when missing email", () => {
    const input = { password: "password" };
    expect(() => new CreateUserInput(input)).toThrow(DomainError);
  });

  it("should throw error when email is empty", () => {
    const input = { email: "", password: "password" };
    expect(() => new CreateUserInput(input)).toThrow(DomainError);
  });

  it("should throw error when missing password", () => {
    const input = { email: "email@teste.com" };
    expect(() => new CreateUserInput(input)).toThrow(DomainError);
  });

  it("should throw error when password is empty", () => {
    const input = { email: "email@teste.com", password: "" };
    expect(() => new CreateUserInput(input)).toThrow(DomainError);
  });
});
