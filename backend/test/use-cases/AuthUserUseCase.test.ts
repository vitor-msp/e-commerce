import express from "express";
import supertest from "supertest";
import { DataSource, Repository } from "typeorm";
import { UserDB } from "../../src/infra/db/schemas/UserDB";
import { App } from "../../src/main/App";
import { IPasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/IPasswordEncryptor";
import { PasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/PasswordEncryptor";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { User } from "../../src/domain/entities/user/User";

describe("Auth User Use Case Tests", () => {
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
          id: "1",
          email: "teste@teste.com",
          password: passwordEncryptor.generateHash("teste123"),
        })
      )
    );
    await usersRepository.save(user1);
    const user2 = UserDB.build(
      new User(
        UserFields.build({
          id: "2",
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
    expect(res.body.jwt.length > 0).toBe(true);
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

  it("should receive bad request cause missing email", async () => {
    const reqBody = {
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("missing email");
  });

  it("should receive bad request cause email is blank", async () => {
    const reqBody = {
      email: "",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("missing email");
  });

  it("should receive bad request cause password is blank", async () => {
    const reqBody = {
      email: "teste@teste.com",
      password: "",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("missing password");
  });

  it("should receive bad request cause missing password", async () => {
    const reqBody = {
      email: "teste@teste.com",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("missing password");
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
