import { User } from "../src/domain/entities/User";

describe("User Tests", () => {
  const getUserExample = () => {
    return {
      email: "  teste@teste.com  ",
      password: "teste123",
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
});
