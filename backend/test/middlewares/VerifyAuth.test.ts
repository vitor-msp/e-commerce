import supertest from "supertest";
import { App } from "../../src/main/app";
import { JwtPayload } from "../../src/use-cases/auth-user/AuthUserUseCase";
import { CreateOrderInputDto } from "../../src/use-cases/create-order/ICreateOrderUseCase";
import { GenerateJwt } from "../../src/utils/GenerateJwt";

describe("Verify Auth Tests", () => {
  let app: any;
  let jwt: string;
  beforeAll(async () => {
    app = new App().express;
    const jwtPayload: JwtPayload = {
      userId: "1",
    };
    jwt = GenerateJwt.execute(jwtPayload);
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
});
