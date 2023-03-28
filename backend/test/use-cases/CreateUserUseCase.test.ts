import supertest from "supertest";
import { App } from "../../src/main/app";

describe("Create User Use Case Tests", () => {
  let app: any;
  beforeAll(async () => {
    app = new App().express;
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
});
