import supertest from "supertest";
import { App } from "../../src/main/app";

describe("Create User Use Case Tests", () => {
  let app: any;
  beforeAll(async () => {
    app = new App().express;
  });

  it("should receive created for a valid user", async () => {
    const reqBody = {
      email: "teste@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/user/signup")
      .send(reqBody);
    expect(res.statusCode).toBe(201);
  });

  it("should receive error cause email already in use", async () => {
    const reqBody = {
      email: "used@teste.com",
      password: "teste123",
    };
    const res: supertest.Response = await supertest(app)
      .post("/user/signup")
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("email already in use");
  });
});
