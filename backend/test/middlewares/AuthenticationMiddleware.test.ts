import supertest from "supertest";
import { App } from "../../src/main/App";
import { IJwtGenerator } from "../../src/use-cases/utils/jwt-generator/IJwtGenerator";
import { JwtGenerator } from "../../src/use-cases/utils/jwt-generator/JwtGenerator";

describe("Verify Auth Tests", () => {
  let app: any;
  let jwt: string;
  const jwtGenerator: IJwtGenerator = new JwtGenerator();

  beforeAll(async () => {
    app = new App().express;
    jwt = jwtGenerator.generate({ invalidField: "1" }, "1d");
  });

  it("should receive forbidden when jwt was not sent", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/orders")
      .send();
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("errorMessage");
  });

  it("should receive forbidden for a blank jwt", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/orders")
      .auth("", { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("errorMessage");
  });

  it("should receive unauthorized for an invalid jwt", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/orders")
      .auth("invalid-jwt", { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(401);
  });

  it("should receive bad request if missing userId", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/orders")
      .auth(jwt, { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("errorMessage");
  });
});
