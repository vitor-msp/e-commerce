import { User } from "../src/domain/entities/User";

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
    expect(savedUser).toHaveProperty("id");
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
});
