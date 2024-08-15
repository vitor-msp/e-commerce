import supertest from "supertest";
import { App } from "../../src/main/App";
import { IJwtGenerator } from "../../src/use-cases/utils/jwt-generator/IJwtGenerator";
import { JwtGenerator } from "../../src/use-cases/utils/jwt-generator/JwtGenerator";
import { Role } from "../../src/domain/value-objects/Role";

describe("Verify Authorization Tests", () => {
  let app: any;
  const jwtGenerator: IJwtGenerator = new JwtGenerator();

  beforeAll(async () => {
    app = new App().express;
  });

  it("should receive forbidden if missing role", async () => {
    const jwt = jwtGenerator.generate({ userId: "1" }, "1d");
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/orders")
      .auth(jwt, { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("errorMessage");
  });

  it("should receive forbidden if role administrator is unauthorized", async () => {
    const jwt = jwtGenerator.generate(
      {
        userId: "1",
        role: Role.Administrator,
      },
      "1d"
    );
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/orders")
      .auth(jwt, { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("errorMessage");
  });

  it("should receive forbidden if role customer is unauthorized", async () => {
    const jwt = jwtGenerator.generate(
      {
        userId: "1",
        role: Role.Customer,
      },
      "1d"
    );
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/users/admin/signup")
      .auth(jwt, { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("errorMessage");
  });
});
