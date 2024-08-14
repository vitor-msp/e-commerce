import uuidValidate from "uuid-validate";
import * as uuid from "uuid";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { IPasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/IPasswordEncryptor";
import { PasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/PasswordEncryptor";
import { Role } from "../../src/domain/value-objects/Role";

describe("User Tests", () => {
  const passwordEncryptor: IPasswordEncryptor = new PasswordEncryptor();

  const getUserExample = (id?: string): User => {
    const userFiels = id
      ? UserFields.rebuild(
          id,
          "teste@teste.com",
          Role.Customer,
          passwordEncryptor.generateHash("teste123"),
          "REFRESH_JWT"
        )
      : UserFields.build({
          email: "teste@teste.com",
          password: passwordEncryptor.generateHash("teste123"),
        });
    return new User(userFiels);
  };

  it("should build a user without role", () => {
    const userFields = getUserExample().getFields();
    expect(uuidValidate(userFields.getData().id)).toBeTruthy();
    expect(userFields.getData().email.email).toBe("teste@teste.com");
    expect(userFields.getData().role).toBe(Role.Customer);
    expect(userFields.getData().password).toBeDefined();
    expect(
      passwordEncryptor.compare("teste123", userFields.getData().password!)
    ).toBeTruthy();
    expect(
      passwordEncryptor.compare("Teste123", userFields.getData().password!)
    ).toBeFalsy();
    expect(userFields.getData().refreshJwt).toBeUndefined();
  });

  it("should build a user with role", () => {
    const userFields = new User(
      UserFields.build({
        email: "teste@teste.com",
        password: passwordEncryptor.generateHash("teste123"),
        role: Role.Administrator,
      })
    ).getFields();
    expect(uuidValidate(userFields.getData().id)).toBeTruthy();
    expect(userFields.getData().email.email).toBe("teste@teste.com");
    expect(userFields.getData().role).toBe(Role.Administrator);
    expect(userFields.getData().password).toBeDefined();
    expect(
      passwordEncryptor.compare("teste123", userFields.getData().password!)
    ).toBeTruthy();
    expect(
      passwordEncryptor.compare("Teste123", userFields.getData().password!)
    ).toBeFalsy();
    expect(userFields.getData().refreshJwt).toBeUndefined();
  });

  it("should rebuild a user with password and refreshJwt", () => {
    const id = uuid.v4();
    const userFields = getUserExample(id).getFields();
    expect(userFields.getData().id).toBe(id);
    expect(userFields.getData().email.email).toBe("teste@teste.com");
    expect(userFields.getData().role).toBe(Role.Customer);
    expect(userFields.getData().password).toBeDefined();
    expect(
      passwordEncryptor.compare("teste123", userFields.getData().password!)
    ).toBeTruthy();
    expect(
      passwordEncryptor.compare("Teste123", userFields.getData().password!)
    ).toBeFalsy();
    expect(userFields.getData().refreshJwt).toBeDefined();
  });

  it("should rebuild a user without password and refreshJwt", () => {
    const id = uuid.v4();
    const userFields = new User(
      UserFields.rebuild(id, "teste@teste.com", Role.Administrator)
    ).getFields();
    expect(userFields.getData().id).toBe(id);
    expect(userFields.getData().email.email).toBe("teste@teste.com");
    expect(userFields.getData().role).toBe(Role.Administrator);
    expect(userFields.getData().password).toBeUndefined();
    expect(userFields.getData().refreshJwt).toBeUndefined();
  });
});
