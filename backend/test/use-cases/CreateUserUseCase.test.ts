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
});
