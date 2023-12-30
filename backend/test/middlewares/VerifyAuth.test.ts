import supertest from "supertest";
import { App } from "../../src/main/app";
import { IJwtGenerator } from "../../src/utils/IJwtGenerator";
import { JwtGenerator } from "../../src/utils/JwtGenerator";

describe("Verify Auth Tests", () => {
  let app: any;
  let jwt: string;
  const jwtGenerator: IJwtGenerator = new JwtGenerator();

  beforeAll(async () => {
    app = new App().express;
    jwt = jwtGenerator.generate({
      invalidField: "1",
    });
  });

  it("should receive forbidden when jwt was not sent", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/order")
      .send();
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toEqual("missing jwt");
  });

  it("should receive forbidden for a blank jwt", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/order")
      .auth("", { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toEqual("missing jwt");
  });

  it("should receive unauthorized for an invalid jwt", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/order")
      .auth("invalid-jwt", { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(401);
  });

  it("should receive bad request if missing userId", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toEqual("missing userId");
  });
});
