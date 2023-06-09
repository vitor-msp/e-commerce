import express from "express";
import supertest from "supertest";
import { Repository } from "typeorm";
import { UserDB } from "../../src/infra/db/schemas/UserDB";
import { App } from "../../src/main/app";
import { database } from "../../src/main/factory";
import { EncryptData } from "../../src/utils/EncryptData";

describe("Auth User Use Case Tests", () => {
  let app: express.Application;
  let usersRepository: Repository<UserDB>;
  beforeAll(async () => {
    app = (await new App().run()).express;
    usersRepository = database.getRepository(UserDB);
    await usersRepository.clear();
    const user1 = new UserDB();
    user1.id = "1";
    user1.email = "teste@teste.com";
    user1.password = EncryptData.execute("teste123");
    await usersRepository.save(user1);
    const user2 = new UserDB();
    user2.id = "2";
    user2.email = "used@teste.com";
    user2.password = EncryptData.execute("used");
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

  it("should receive unauthorized for email not found", async () => {
    const reqBody = {
      email: "not-exist@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("incorrect email or password");
  });

  it("should receive unauthorized for incorrect password", async () => {
    const reqBody = {
      email: "user@teste.com",
      password: "incorrect-password",
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/user/signin")
      .send(reqBody);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("incorrect email or password");
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
    await database.destroy();
  });
});
