import uuidValidate from "uuid-validate";
import * as uuid from "uuid";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { CompareEncryptedData } from "../../src/utils/CompareEncryptedData";
import { EncryptData } from "../../src/utils/EncryptData";

describe("User Tests", () => {
  const buildUserExample = (): User => {
    return new User(
      UserFields.build({
        email: "teste@teste.com",
        password: EncryptData.execute("teste123"),
      })
    );
  };

  const rebuildUserExample = (id: string): User => {
    return new User(
      UserFields.rebuild(id, "teste@teste.com", EncryptData.execute("teste123"))
    );
  };

  it("should build a user", () => {
    const userFields = buildUserExample().getFields();
    expect(uuidValidate(userFields.getData().id)).toBeTruthy();
    expect(userFields.getData().email.email).toBe("teste@teste.com");
    expect(userFields.getData().password).toBeDefined();
    expect(
      CompareEncryptedData.execute("teste123", userFields.getData().password!)
    ).toBeTruthy();
    expect(
      CompareEncryptedData.execute("Teste123", userFields.getData().password!)
    ).toBeFalsy();
  });

  it("should rebuild a user with password", () => {
    const id = uuid.v4();
    const userFields = rebuildUserExample(id).getFields();
    expect(userFields.getData().id).toBe(id);
    expect(userFields.getData().email.email).toBe("teste@teste.com");
    expect(userFields.getData().password).toBeDefined();
    expect(
      CompareEncryptedData.execute("teste123", userFields.getData().password!)
    ).toBeTruthy();
    expect(
      CompareEncryptedData.execute("Teste123", userFields.getData().password!)
    ).toBeFalsy();
  });

  it("should rebuild a user without password", () => {
    const id = uuid.v4();
    const userFields = new User(
      UserFields.rebuild(id, "teste@teste.com")
    ).getFields();
    expect(userFields.getData().id).toBe(id);
    expect(userFields.getData().email.email).toBe("teste@teste.com");
    expect(userFields.getData().password).toBeUndefined();
  });
});
