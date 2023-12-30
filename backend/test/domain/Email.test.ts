import { Email } from "../../src/domain/value-objects/Email";

describe("Email Tests", () => {
  it("should throw error for a invalid email", () => {
    const email = "  teste.teste.com  ";
    expect(() => {
      Email.build(email);
    }).toThrow(Error);
  });

  it("should return filtered email for a valid email", () => {
    const email = " teste@teste.com  ";
    expect(Email.build(email).email).toEqual("teste@teste.com");
  });
});
