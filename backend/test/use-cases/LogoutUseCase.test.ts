import { JwtValidator } from "../../src/use-cases/utils/jwt-validator/JwtValidator";
import { UsersRepositoryPG } from "../../src/repositories/users/UsersRepositoryPG";
import { LogoutUseCase } from "../../src/use-cases/logout/LogoutUseCase";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { LogoutInput } from "../../src/use-cases/logout/LogoutInput";

jest.mock("../../src/use-cases/utils/jwt-validator/JwtValidator");
jest.mock("../../src/repositories/users/UsersRepositoryPG");

const JwtValidatorMock = JwtValidator as jest.Mock<JwtValidator>;
const UsersRepositoryPGMock = UsersRepositoryPG as jest.Mock<UsersRepositoryPG>;

const makeSut = () => {
  const jwtValidatorMock = new JwtValidatorMock() as jest.Mocked<JwtValidator>;
  const usersRepositoryPGMock =
    new UsersRepositoryPGMock() as jest.Mocked<UsersRepositoryPG>;
  const sut = new LogoutUseCase(usersRepositoryPGMock, jwtValidatorMock);
  return {
    sut,
    usersRepositoryPGMock,
    jwtValidatorMock,
  };
};

const REFRESH_JWT: string = "refresh-jwt-token";
const OTHER_REFRESH_JWT: string = "other-refresh-jwt-token";
const USER_EMAIL: string = "teste@teste.com";
const USER_ID: string = "1";
const USER_PASSWORD: string = "password";

const getRefreshTokenInputExample = (): LogoutInput => {
  return new LogoutInput({
    refreshJwt: REFRESH_JWT,
  });
};

const getUserExample = (refreshJwt: string = REFRESH_JWT): User => {
  return new User(
    UserFields.rebuild(USER_ID, USER_EMAIL, USER_PASSWORD, refreshJwt)
  );
};

describe("Logout Use Case Tests", () => {
  let sut: LogoutUseCase;
  let usersRepositoryPGMock: jest.Mocked<UsersRepositoryPG>;
  let jwtValidatorMock: jest.Mocked<JwtValidator>;

  beforeAll(() => {
    const mocks = makeSut();
    sut = mocks.sut;
    usersRepositoryPGMock = mocks.usersRepositoryPGMock;
    jwtValidatorMock = mocks.jwtValidatorMock;
  });

  it("should delete refresh token", async () => {
    const user = getUserExample();
    jwtValidatorMock.validate.mockResolvedValueOnce(USER_ID);
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(user);

    await sut.execute(getRefreshTokenInputExample());

    expect(jwtValidatorMock.validate).toHaveBeenCalledTimes(1);
    expect(jwtValidatorMock.validate).toHaveBeenCalledWith(REFRESH_JWT);

    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith(USER_ID);

    expect(usersRepositoryPGMock.deleteRefreshJwt).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.deleteRefreshJwt).toHaveBeenCalledWith(
      USER_ID
    );
  });

  it("should throw exception for jwt not equal saved jwt", async () => {
    jwtValidatorMock.validate.mockResolvedValueOnce(USER_ID);
    const user = getUserExample(OTHER_REFRESH_JWT);
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(user);

    expect(
      async () => await sut.execute(getRefreshTokenInputExample())
    ).rejects.toThrowError("token is not valid");

    expect(jwtValidatorMock.validate).toHaveBeenCalledTimes(1);
    expect(jwtValidatorMock.validate).toHaveBeenCalledWith(REFRESH_JWT);

    // expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    // expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith(USER_ID);

    expect(usersRepositoryPGMock.deleteRefreshJwt).toHaveBeenCalledTimes(0);
  });

  it("should throw exception when user not found", async () => {
    jwtValidatorMock.validate.mockResolvedValueOnce(USER_ID);
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(null);

    expect(
      async () => await sut.execute(getRefreshTokenInputExample())
    ).rejects.toThrowError("user not found");

    expect(jwtValidatorMock.validate).toHaveBeenCalledTimes(1);
    expect(jwtValidatorMock.validate).toHaveBeenCalledWith(REFRESH_JWT);

    // expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    // expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith(USER_ID);

    expect(usersRepositoryPGMock.deleteRefreshJwt).toHaveBeenCalledTimes(0);
  });
});