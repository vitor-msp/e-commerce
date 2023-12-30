import { Email } from "../../src/domain/value-objects/Email";
import { DomainError } from "../../src/errors/DomainError";

describe("Email Tests", () => {
  it("should throw error for a invalid email", () => {
    const email = "  teste.teste.com  ";
    expect(() => {
      Email.build(email);
    }).toThrow(DomainError);
  });

  it("should return filtered email for a valid email", () => {
    const email = " teste@teste.com  ";
    expect(Email.build(email).email).toEqual("teste@teste.com");
  });
});
