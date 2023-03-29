import supertest from "supertest";
import { App } from "../../src/main/app";

describe("Create Order Use Case Tests", () => {
  let app: any;
  beforeAll(async () => {
    app = new App().express;
  });

  it("should receive created for a valid order", async () => {
    const reqBody = {
      date: new Date().toISOString(),
      items: [
        {
          supplierId: "supplier-id",
          productId: "product-id",
          productName: "product-name",
          unitPrice: 15.62,
          quantity: 5,
        },
      ],
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/order")
      .send(reqBody);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("orderId");
  });
});
