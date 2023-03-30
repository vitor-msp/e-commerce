import supertest from "supertest";
import { App } from "../../src/main/app";
import { DEFAULT_DATE } from "../../src/repositories/orders/OrdersRepositoryMemory";
import { GetOrdersOutputDto } from "../../src/use-cases/get-orders/IGetOrdersUseCase";
import { GenerateJwt } from "../../src/utils/GenerateJwt";

describe("Get Orders Use Case Tests", () => {
  let app: any;
  beforeAll(async () => {
    app = new App().express;
  });

  it("should receive ok with orders", async () => {
    const jwt = GenerateJwt.execute({
      userId: "100",
    });
    const res: supertest.Response = await supertest(app)
      .get("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send();
    const resExpected: GetOrdersOutputDto = {
      orders: [
        {
          id: "100",
          date: DEFAULT_DATE,
          items: [
            {
              supplierId: "1",
              productId: "1",
              productName: "productName",
              unitPrice: 10.5,
              quantity: 10,
            },
            {
              supplierId: "2",
              productId: "2",
              productName: "productName",
              unitPrice: 10.5,
              quantity: 10,
            },
          ],
        },
        {
          id: "101",
          date: DEFAULT_DATE,
          items: [
            {
              supplierId: "3",
              productId: "3",
              productName: "productName",
              unitPrice: 10.5,
              quantity: 10,
            },
          ],
        },
      ],
    };
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(resExpected);
  });

  it("should receive ok with empty orders list", async () => {
    const jwt = GenerateJwt.execute({
      userId: "101",
    });
    const res: supertest.Response = await supertest(app)
      .get("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send();
    const resExpected: any = { orders: [] };
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(resExpected);
  });
});
