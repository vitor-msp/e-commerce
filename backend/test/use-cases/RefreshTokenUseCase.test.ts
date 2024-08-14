import { JwtGenerator } from "../../src/use-cases/utils/jwt-generator/JwtGenerator";
import { JwtValidator } from "../../src/use-cases/utils/jwt-validator/JwtValidator";
import { UsersRepositoryPG } from "../../src/repositories/users/UsersRepositoryPG";
import { RefreshTokenUseCase } from "../../src/use-cases/refresh-token/RefreshTokenUseCase";
import { RefreshTokenInput } from "../../src/use-cases/refresh-token/RefreshTokenInput";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { Role } from "../../src/domain/value-objects/Role";

jest.mock("../../src/use-cases/utils/jwt-validator/JwtValidator");
jest.mock("../../src/use-cases/utils/jwt-generator/JwtGenerator");
jest.mock("../../src/repositories/users/UsersRepositoryPG");

const JwtValidatorMock = JwtValidator as jest.Mock<JwtValidator>;
const JwtGeneratorMock = JwtGenerator as jest.Mock<JwtGenerator>;
const UsersRepositoryPGMock = UsersRepositoryPG as jest.Mock<UsersRepositoryPG>;

const makeSut = () => {
  const jwtValidatorMock = new JwtValidatorMock() as jest.Mocked<JwtValidator>;
  const jwtGeneratorMock = new JwtGeneratorMock() as jest.Mocked<JwtGenerator>;
  const usersRepositoryPGMock =
    new UsersRepositoryPGMock() as jest.Mocked<UsersRepositoryPG>;
  const sut = new RefreshTokenUseCase(
    usersRepositoryPGMock,
    jwtValidatorMock,
    jwtGeneratorMock
  );
  return {
    sut,
    usersRepositoryPGMock,
    jwtValidatorMock,
    jwtGeneratorMock,
  };
};

const JWT: string = "jwt-token";
const REFRESH_JWT: string = "refresh-jwt-token";
const OTHER_REFRESH_JWT: string = "other-refresh-jwt-token";
const USER_EMAIL: string = "teste@teste.com";
const USER_ID: string = "1";
const USER_PASSWORD: string = "password";

const getRefreshTokenInputExample = (): RefreshTokenInput => {
  return new RefreshTokenInput({
    refreshJwt: REFRESH_JWT,
  });
};

const getUserExample = (refreshJwt: string = REFRESH_JWT): User => {
  return new User(
    UserFields.rebuild(
      USER_ID,
      USER_EMAIL,
      Role.Customer,
      USER_PASSWORD,
      refreshJwt
    )
  );
};

describe("Refresh Token Use Case Tests", () => {
  let sut: RefreshTokenUseCase;
  let usersRepositoryPGMock: jest.Mocked<UsersRepositoryPG>;
  let jwtValidatorMock: jest.Mocked<JwtValidator>;
  let jwtGeneratorMock: jest.Mocked<JwtGenerator>;

  beforeAll(() => {
    const mocks = makeSut();
    sut = mocks.sut;
    usersRepositoryPGMock = mocks.usersRepositoryPGMock;
    jwtValidatorMock = mocks.jwtValidatorMock;
    jwtGeneratorMock = mocks.jwtGeneratorMock;
  });

  it("should generate new jwt token", async () => {
    const user = getUserExample();
    const userId = USER_ID;
    jwtValidatorMock.getContent.mockResolvedValueOnce({
      userId,
      role: Role.Customer,
    });
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(user);
    jwtGeneratorMock.generate.mockReturnValueOnce(JWT);

    const output = await sut.execute(getRefreshTokenInputExample());

    expect(output.jwt).toBe(JWT);
    expect(jwtValidatorMock.getContent).toHaveBeenCalledTimes(1);
    expect(jwtValidatorMock.getContent).toHaveBeenCalledWith(REFRESH_JWT);

    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith(userId);

    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(1);
    expect(jwtGeneratorMock.generate).toHaveBeenCalledWith({ userId }, "15m");
  });

  it("should throw exception for jwt not equal saved jwt", async () => {
    jwtValidatorMock.getContent.mockResolvedValueOnce({
      userId: USER_ID,
      role: Role.Customer,
    });
    const user = getUserExample(OTHER_REFRESH_JWT);
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(user);

    expect(
      async () => await sut.execute(getRefreshTokenInputExample())
    ).rejects.toThrowError("token is not valid");

    expect(jwtValidatorMock.getContent).toHaveBeenCalledTimes(1);
    expect(jwtValidatorMock.getContent).toHaveBeenCalledWith(REFRESH_JWT);

    // expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    // expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith(USER_ID);

    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
  });

  it("should throw exception when user not found", async () => {
    jwtValidatorMock.getContent.mockResolvedValueOnce({
      userId: USER_ID,
      role: Role.Customer,
    });
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(null);

    expect(
      async () => await sut.execute(getRefreshTokenInputExample())
    ).rejects.toThrowError("user not found");

    expect(jwtValidatorMock.getContent).toHaveBeenCalledTimes(1);
    expect(jwtValidatorMock.getContent).toHaveBeenCalledWith(REFRESH_JWT);

    // expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    // expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith(USER_ID);

    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
  });
});
