import express from "express";
import supertest from "supertest";
import { UserDB } from "../../src/infra/db/schemas/UserDB";
import { App } from "../../src/main/App";
import uuidValidate from "uuid-validate";
import { DataSource, Repository } from "typeorm";
import { IPasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/IPasswordEncryptor";
import { PasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/PasswordEncryptor";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { User } from "../../src/domain/entities/user/User";

describe("Create User Tests", () => {
  let app: express.Application;
  let dataSource: DataSource;
  let usersRepository: Repository<UserDB>;
  const passwordEncryptor: IPasswordEncryptor = new PasswordEncryptor();

  beforeAll(async () => {
    const application = await new App().run();
    app = application.express;
    dataSource = application.getDataSource();
    usersRepository = dataSource.getRepository(UserDB);
    await usersRepository.clear();
    const user1 = UserDB.build(
      new User(
        UserFields.build({
          email: "teste@teste.com",
          password: passwordEncryptor.generateHash("teste123"),
        })
      )
    );
    await usersRepository.save(user1);
    const user2 = UserDB.build(
      new User(
        UserFields.build({
          email: "used@teste.com",
          password: passwordEncryptor.generateHash("used"),
        })
      )
    );
    await usersRepository.save(user2);
  });

  it("should receive created for a valid user", async () => {
    const reqBody = {
      email: "notexist@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/users/signup")
      .send(reqBody);
    expect(res.statusCode).toBe(201);
    const savedUser = await usersRepository.findOneBy({ email: reqBody.email });
    expect(savedUser).toBeDefined();
    expect(uuidValidate(savedUser!.id!)).toBeTruthy();
    expect(savedUser!.email).toBe(reqBody.email);
    expect(
      passwordEncryptor.compare(reqBody.password, savedUser!.password!)
    ).toBeTruthy();
  });

  it("should receive bad request when email already in use", async () => {
    const reqBody = {
      email: "used@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/users/signup")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    const savedUsers = await usersRepository.findBy({
      email: reqBody.email,
    });
    expect(savedUsers.length).toBe(1);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
