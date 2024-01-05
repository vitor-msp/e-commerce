import { JwtGenerator } from "../../src/use-cases/utils/jwt-generator/JwtGenerator";
import { PasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/PasswordEncryptor";
import { UsersRepositoryPG } from "../../src/repositories/users/UsersRepositoryPG";
import { AuthUserUseCase } from "../../src/use-cases/auth-user/AuthUserUseCase";
import { AuthUserInput } from "../../src/use-cases/auth-user/AuthUserInput";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";

jest.mock("../../src/use-cases/utils/jwt-generator/JwtGenerator");
jest.mock("../../src/use-cases/utils/password-encryptor/PasswordEncryptor");
jest.mock("../../src/repositories/users/UsersRepositoryPG");

const JwtGeneratorMock = JwtGenerator as jest.Mock<JwtGenerator>;
const PasswordEncryptorMock = PasswordEncryptor as jest.Mock<PasswordEncryptor>;
const UsersRepositoryPGMock = UsersRepositoryPG as jest.Mock<UsersRepositoryPG>;

const makeSut = () => {
  const jwtGeneratorMock = new JwtGeneratorMock() as jest.Mocked<JwtGenerator>;
  const passwordEncryptorMock =
    new PasswordEncryptorMock() as jest.Mocked<PasswordEncryptor>;
  const usersRepositoryPGMock =
    new UsersRepositoryPGMock() as jest.Mocked<UsersRepositoryPG>;
  const sut = new AuthUserUseCase(
    usersRepositoryPGMock,
    passwordEncryptorMock,
    jwtGeneratorMock
  );
  return {
    sut,
    usersRepositoryPGMock,
    passwordEncryptorMock,
    jwtGeneratorMock,
  };
};

const getUserExample = (withPassword: boolean): User => {
  const fields = withPassword
    ? { email: "teste@teste.com", password: "teste-hash" }
    : { email: "teste@teste.com" };
  return new User(UserFields.build(fields));
};

const getAuthUserInputExample = (): AuthUserInput => {
  return new AuthUserInput({
    email: "teste@teste.com",
    password: "teste",
  });
};

describe("Auth User Use Case Tests", () => {
  let sut: AuthUserUseCase;
  let usersRepositoryPGMock: jest.Mocked<UsersRepositoryPG>;
  let passwordEncryptorMock: jest.Mocked<PasswordEncryptor>;
  let jwtGeneratorMock: jest.Mocked<JwtGenerator>;

  beforeAll(() => {
    const mocks = makeSut();
    sut = mocks.sut;
    usersRepositoryPGMock = mocks.usersRepositoryPGMock;
    passwordEncryptorMock = mocks.passwordEncryptorMock;
    jwtGeneratorMock = mocks.jwtGeneratorMock;
  });

  it("should authenticate user when password is correct", async () => {
    const savedUser = getUserExample(true);
    usersRepositoryPGMock.selectByEmail.mockResolvedValueOnce(savedUser);
    passwordEncryptorMock.compare.mockReturnValueOnce(true);
    jwtGeneratorMock.generate.mockReturnValueOnce("jwt-token");

    const output = await sut.execute(getAuthUserInputExample());

    expect(output.jwt).toBe("jwt-token");
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledWith(
      "teste@teste.com"
    );
    expect(passwordEncryptorMock.compare).toHaveBeenCalledTimes(1);
    expect(passwordEncryptorMock.compare).toHaveBeenCalledWith(
      "teste",
      savedUser.getPassword()
    );
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(1);
    expect(jwtGeneratorMock.generate).toHaveBeenCalledWith({
      userId: savedUser.getId(),
    });
  });

  it("should throw exception for email not found", () => {
    usersRepositoryPGMock.selectByEmail.mockResolvedValueOnce(null);

    const input = new AuthUserInput({
      email: "used@teste.com",
      password: "teste",
    });

    expect(async () => await sut.execute(input)).rejects.toThrowError(
      "email not found"
    );

    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledWith(
      "used@teste.com"
    );
    expect(passwordEncryptorMock.compare).toHaveBeenCalledTimes(0);
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
  });

  it("should throw exception for password hash not found", () => {
    const savedUser = getUserExample(false);
    usersRepositoryPGMock.selectByEmail.mockResolvedValueOnce(savedUser);

    expect(
      async () => await sut.execute(getAuthUserInputExample())
    ).rejects.toThrowError("password hash not found");

    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledWith(
      "teste@teste.com"
    );
    expect(passwordEncryptorMock.compare).toHaveBeenCalledTimes(0);
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
  });

  it("should throw exception for incorrect password", () => {
    const savedUser = getUserExample(true);
    usersRepositoryPGMock.selectByEmail.mockResolvedValueOnce(savedUser);
    passwordEncryptorMock.compare.mockReturnValueOnce(false);

    expect(
      async () => await sut.execute(getAuthUserInputExample())
    ).rejects.toThrowError("incorrect email or password");

    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledWith(
      "teste@teste.com"
    );
    // expect(passwordEncryptorMock.compare).toHaveBeenCalledTimes(1);
    // expect(passwordEncryptorMock.compare).toHaveBeenCalledWith(
    //   "incorrect",
    //   savedUser.getPassword()
    // );
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
  });
});
