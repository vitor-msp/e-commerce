import express from "express";
import supertest from "supertest";
import { UserDB } from "../../src/infra/db/schemas/UserDB";
import { App } from "../../src/main/App";
import uuidValidate from "uuid-validate";
import { DataSource, Repository } from "typeorm";
import { IPasswordEncryptor } from "../../src/utils/password-encryptor/IPasswordEncryptor";
import { PasswordEncryptor } from "../../src/utils/password-encryptor/PasswordEncryptor";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { User } from "../../src/domain/entities/user/User";

describe("Create User Use Case Tests", () => {
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

  it("should receive created for a valid user", async () => {
    const reqBody = {
      email: "notexist@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signup")
      .send(reqBody);
    expect(res.statusCode).toBe(201);
    const savedUser = await usersRepository.findOneBy({ email: reqBody.email });
    expect(savedUser).toBeDefined();
    expect(uuidValidate(savedUser!.id!)).toBe(true);
    expect(savedUser!.email).toBe(reqBody.email);
    expect(
      passwordEncryptor.compare(reqBody.password, savedUser!.password!)
    ).toBe(true);
  });

  it("should receive bad request when email already in use", async () => {
    const reqBody = {
      email: "used@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signup")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
  });

  it("should receive bad request for invalid email", async () => {
    const reqBody = {
      email: "used.teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signup")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid email");
  });

  it("should receive bad request cause missing email", async () => {
    const reqBody = {
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signup")
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
      .post("/api/v1/user/signup")
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
      .post("/api/v1/user/signup")
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
      .post("/api/v1/user/signup")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("missing password");
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
