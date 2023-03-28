import supertest from "supertest";
import { App } from "../../src/main/app";

describe("Auth User Use Case Tests", () => {
  let app: any;
  beforeAll(async () => {
    app = new App().express;
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
});
