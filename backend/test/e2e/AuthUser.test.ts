import express from "express";
import supertest from "supertest";
import { DataSource, Repository } from "typeorm";
import { UserDB } from "../../src/infra/db/schemas/UserDB";
import { App } from "../../src/main/App";
import { IPasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/IPasswordEncryptor";
import { PasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/PasswordEncryptor";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { User } from "../../src/domain/entities/user/User";

describe("Auth User Tests", () => {
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

  it("should receive ok when password is correct", async () => {
    const reqBody = {
      email: "teste@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("jwt");
    expect(res.body.jwt.length > 0).toBeTruthy();
  });

  it("should receive bad request for email not found", async () => {
    const reqBody = {
      email: "not-exist@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
  });

  it("should receive unauthorized for incorrect password", async () => {
    const reqBody = {
      email: "teste@teste.com",
      password: "incorrect-password",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("errorMessage");
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
