import { User } from "../src/domain/entities/User";
import uuidValidate from "uuid-validate";

describe("User Tests", () => {
  const getUserExample = (id?: string) => {
    return {
      email: "  teste@teste.com  ",
      password: "teste123",
      id: id ?? "",
    };
  };

  it("should create user without id", () => {
    const userData = getUserExample();
    const user = new User(userData);
    const savedUser = user.getData();
    //@ts-ignore
    expect(uuidValidate(savedUser.id)).toBe(true);
    expect(savedUser.email).toBe("teste@teste.com");
    expect(user.passwordIsCorrect("teste123")).toBe(true);
    expect(user.passwordIsCorrect("Teste123")).toBe(false);
  });

  it("should create user with id", () => {
    const userData = getUserExample("testing-id");
    const user = new User(userData);
    const savedUser = user.getData();
    expect(savedUser.id).toBe("testing-id");
    expect(savedUser.email).toBe("teste@teste.com");
    expect(user.passwordIsCorrect("teste123")).toBe(true);
    expect(user.passwordIsCorrect("Teste123")).toBe(false);
  });

  it("should not create user with invalid email", () => {
    const userData = getUserExample();
    userData.email = "  teste.teste.com  ";
    expect(() => {
      new User(userData);
    }).toThrow(Error);
  });

  it("should not create user with blank email", () => {
    const userData = getUserExample();
    userData.email = "    ";
    expect(() => {
      new User(userData);
    }).toThrow(Error);
  });

  it("should create user with blank password", () => {
    const userData = getUserExample();
    userData.password = "";
    const user = new User(userData);
    expect(() => {
      user.passwordIsCorrect("");
    }).toThrow(Error);
  });
});
