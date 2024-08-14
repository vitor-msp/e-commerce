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

const EMAIL_NOT_USED: string = "not-used@teste.com";
const USER_EMAIL: string = "teste@teste.com";
const USER_PASSWORD: string = "password";
const USER_PASSWORD_HASH: string = "password-hash";
const JWT: string = "jwt-token";
const REFRESH_JWT: string = "refresh-jwt-token";

const getUserExample = (withPassword: boolean): User => {
  const fields = withPassword
    ? { email: USER_EMAIL, password: USER_PASSWORD_HASH }
    : { email: USER_EMAIL };
  return new User(UserFields.build(fields));
};

const getAuthUserInputExample = (): AuthUserInput => {
  return new AuthUserInput({
    email: USER_EMAIL,
    password: USER_PASSWORD,
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
    const user = getUserExample(true);
    usersRepositoryPGMock.selectByEmail.mockResolvedValueOnce(user);
    passwordEncryptorMock.compare.mockReturnValueOnce(true);
    jwtGeneratorMock.generate.mockReturnValueOnce(JWT);
    jwtGeneratorMock.generate.mockReturnValueOnce(REFRESH_JWT);

    const output = await sut.execute(getAuthUserInputExample());

    expect(output.jwt).toBe(JWT);
    expect(output.refreshJwt).toBe(REFRESH_JWT);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledWith(
      USER_EMAIL
    );
    expect(passwordEncryptorMock.compare).toHaveBeenCalledTimes(1);
    expect(passwordEncryptorMock.compare).toHaveBeenCalledWith(
      USER_PASSWORD,
      user.getPassword()
    );
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(2);
    const userId = user.getId();
    expect(jwtGeneratorMock.generate).toHaveBeenNthCalledWith(
      1,
      { userId },
      "15m"
    );
    expect(jwtGeneratorMock.generate).toHaveBeenNthCalledWith(
      2,
      { userId },
      "7d"
    );
    expect(usersRepositoryPGMock.updateRefreshJwt).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.updateRefreshJwt).toHaveBeenCalledWith(
      userId,
      REFRESH_JWT
    );
  });

  it("should throw exception for email not found", () => {
    usersRepositoryPGMock.selectByEmail.mockResolvedValueOnce(null);

    const input = new AuthUserInput({
      email: EMAIL_NOT_USED,
      password: USER_PASSWORD,
    });
    expect(async () => await sut.execute(input)).rejects.toThrowError(
      "email not found"
    );

    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledWith(
      EMAIL_NOT_USED
    );
    expect(passwordEncryptorMock.compare).toHaveBeenCalledTimes(0);
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
  });

  it("should throw exception for password hash not found", () => {
    usersRepositoryPGMock.selectByEmail.mockResolvedValueOnce(
      getUserExample(false)
    );

    expect(
      async () => await sut.execute(getAuthUserInputExample())
    ).rejects.toThrowError("password hash not found");

    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledWith(
      USER_EMAIL
    );
    expect(passwordEncryptorMock.compare).toHaveBeenCalledTimes(0);
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
  });

  it("should throw exception for incorrect password", () => {
    const user = getUserExample(true);
    usersRepositoryPGMock.selectByEmail.mockResolvedValueOnce(user);
    passwordEncryptorMock.compare.mockReturnValueOnce(false);

    expect(
      async () => await sut.execute(getAuthUserInputExample())
    ).rejects.toThrowError("incorrect email or password");

    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByEmail).toHaveBeenCalledWith(
      USER_EMAIL
    );
    // expect(passwordEncryptorMock.compare).toHaveBeenCalledTimes(1);
    // expect(passwordEncryptorMock.compare).toHaveBeenCalledWith(
    //   "incorrect",
    //   user.getPassword()
    // );
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
  });
});
