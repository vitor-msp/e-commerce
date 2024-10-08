import { UsersRepositoryPG } from "../../src/repositories/users/UsersRepositoryPG";
import { AuthUserSSOInput } from "../../src/use-cases/auth-user-sso/AuthUserSSOInput";
import { AuthUserSSOUseCase } from "../../src/use-cases/auth-user-sso/AuthUserSSOUseCase";
import { JwtGenerator } from "../../src/use-cases/utils/jwt-generator/JwtGenerator";
import { Role } from "../../src/domain/value-objects/Role";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { ApplicationError } from "../../src/errors/ApplicationError";

jest.mock("../../src/repositories/users/UsersRepositoryPG");
jest.mock("../../src/use-cases/utils/jwt-generator/JwtGenerator");

const UsersRepositoryPGMock = UsersRepositoryPG as jest.Mock<UsersRepositoryPG>;
const JwtGeneratorMock = JwtGenerator as jest.Mock<JwtGenerator>;

const makeSut = () => {
  const usersRepositoryPGMock =
    new UsersRepositoryPGMock() as jest.Mocked<UsersRepositoryPG>;
  const jwtGeneratorMock = new JwtGeneratorMock() as jest.Mocked<JwtGenerator>;
  const sut = new AuthUserSSOUseCase(usersRepositoryPGMock, jwtGeneratorMock);
  return { sut, usersRepositoryPGMock, jwtGeneratorMock };
};

const USER_EMAIL: string = "teste@teste.com";
const GITHUB_ID: string = "1";
const JWT: string = "jwt-token";
const REFRESH_JWT: string = "refresh-jwt-token";

const getUserExample = (): User => {
  const fields = { email: USER_EMAIL, githubId: GITHUB_ID };
  return new User(UserFields.build(fields));
};

const getAuthUserSSOInputExample = (): AuthUserSSOInput => {
  return new AuthUserSSOInput({
    ssoIdField: "github",
    ssoIdValue: GITHUB_ID,
    email: USER_EMAIL,
  });
};

describe("Auth User SSO Use Case Tests", () => {
  let sut: AuthUserSSOUseCase;
  let usersRepositoryPGMock: jest.Mocked<UsersRepositoryPG>;
  let jwtGeneratorMock: jest.Mocked<JwtGenerator>;

  beforeAll(() => {
    const mocks = makeSut();
    sut = mocks.sut;
    usersRepositoryPGMock = mocks.usersRepositoryPGMock;
    jwtGeneratorMock = mocks.jwtGeneratorMock;
  });

  it("should create a valid user", async () => {
    usersRepositoryPGMock.selectByGithubId.mockResolvedValueOnce(null);
    usersRepositoryPGMock.existsByEmail.mockResolvedValueOnce(false);
    jwtGeneratorMock.generate.mockReturnValueOnce(JWT);
    jwtGeneratorMock.generate.mockReturnValueOnce(REFRESH_JWT);

    const output = await sut.execute(getAuthUserSSOInputExample());

    expect(usersRepositoryPGMock.selectByGithubId).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByGithubId).toHaveBeenCalledWith(
      GITHUB_ID
    );
    expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledWith(
      USER_EMAIL
    );
    expect(usersRepositoryPGMock.insert).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        fields: {
          id: expect.any(String),
          email: { email: USER_EMAIL },
          githubId: GITHUB_ID,
          role: "Customer",
        },
      })
    );
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(2);
    expect(jwtGeneratorMock.generate).toHaveBeenNthCalledWith(
      1,
      { userId: expect.any(String), role: Role.Customer },
      "15m"
    );
    expect(jwtGeneratorMock.generate).toHaveBeenNthCalledWith(
      2,
      { userId: expect.any(String) },
      "7d"
    );
    expect(usersRepositoryPGMock.updateRefreshJwt).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.updateRefreshJwt).toHaveBeenCalledWith(
      expect.any(String),
      REFRESH_JWT
    );
    expect(output.jwt).toBe(JWT);
    expect(output.refreshJwt).toBe(REFRESH_JWT);
  });

  it("should authenticate a existing user", async () => {
    const user = getUserExample();
    usersRepositoryPGMock.selectByGithubId.mockResolvedValueOnce(user);
    jwtGeneratorMock.generate.mockReturnValueOnce(JWT);
    jwtGeneratorMock.generate.mockReturnValueOnce(REFRESH_JWT);

    const output = await sut.execute(getAuthUserSSOInputExample());

    expect(usersRepositoryPGMock.selectByGithubId).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByGithubId).toHaveBeenCalledWith(
      GITHUB_ID
    );
    expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledTimes(0);
    expect(usersRepositoryPGMock.insert).toHaveBeenCalledTimes(0);
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(2);
    expect(jwtGeneratorMock.generate).toHaveBeenNthCalledWith(
      1,
      { userId: expect.any(String), role: Role.Customer },
      "15m"
    );
    expect(jwtGeneratorMock.generate).toHaveBeenNthCalledWith(
      2,
      { userId: expect.any(String) },
      "7d"
    );
    expect(usersRepositoryPGMock.updateRefreshJwt).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.updateRefreshJwt).toHaveBeenCalledWith(
      expect.any(String),
      REFRESH_JWT
    );
    expect(output.jwt).toBe(JWT);
    expect(output.refreshJwt).toBe(REFRESH_JWT);
  });

  it("should throw exception when email already in use", async () => {
    usersRepositoryPGMock.selectByGithubId.mockResolvedValueOnce(null);
    usersRepositoryPGMock.existsByEmail.mockResolvedValueOnce(true);

    expect(
      async () => await sut.execute(getAuthUserSSOInputExample())
    ).rejects.toThrowError(ApplicationError);

    expect(usersRepositoryPGMock.selectByGithubId).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectByGithubId).toHaveBeenCalledWith(
      GITHUB_ID
    );
    // expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledTimes(1);
    // expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledWith(
    //   USER_EMAIL
    // );
    expect(usersRepositoryPGMock.insert).toHaveBeenCalledTimes(0);
    expect(jwtGeneratorMock.generate).toHaveBeenCalledTimes(0);
    expect(usersRepositoryPGMock.updateRefreshJwt).toHaveBeenCalledTimes(0);
  });
});
