import express from "express";
import supertest from "supertest";
import { UserDB } from "../../src/infra/db/schemas/UserDB";
import { App } from "../../src/main/app";
import { CompareEncryptedData } from "../../src/utils/CompareEncryptedData";
import uuidValidate from "uuid-validate";
import { database } from "../../src/main/factory";
import { Repository } from "typeorm";
import { EncryptData } from "../../src/utils/EncryptData";

describe("Create User Use Case Tests", () => {
  let app: express.Application;
  let usersRepository: Repository<UserDB>;
  beforeAll(async () => {
    app = (await new App().run()).express;
    usersRepository = database.getRepository(UserDB);
    await usersRepository.clear();
    await usersRepository.save({
      id: "1",
      email: "teste@teste.com",
      password: EncryptData.execute("teste123"),
    });
    await usersRepository.save({
      id: "2",
      email: "used@teste.com",
      password: EncryptData.execute("used"),
    });
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
    expect(uuidValidate(savedUser!.id)).toBe(true);
    expect(savedUser!.email).toBe(reqBody.email);
    expect(
      CompareEncryptedData.execute(reqBody.password, savedUser!.password)
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
    expect(res.body.errorMessage).toBe("email already in use");
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
    await database.destroy();
  });
});
