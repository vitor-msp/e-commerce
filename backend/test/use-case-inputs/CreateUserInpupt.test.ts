import { ApplicationError } from "../../src/errors/ApplicationError";
import { CreateUserInput } from "../../src/use-cases/create-user/CreateUserInput";

describe("Create User Input Tests", () => {
  it("should throw error when missing email", () => {
    const input = { password: "password" };
    expect(() => new CreateUserInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when email is empty", () => {
    const input = { email: "", password: "password" };
    expect(() => new CreateUserInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when missing password", () => {
    const input = { email: "email@teste.com" };
    expect(() => new CreateUserInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when password is empty", () => {
    const input = { email: "email@teste.com", password: "" };
    expect(() => new CreateUserInput(input)).toThrow(ApplicationError);
  });
});
