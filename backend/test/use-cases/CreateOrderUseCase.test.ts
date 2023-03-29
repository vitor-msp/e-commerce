import supertest from "supertest";
import { App } from "../../src/main/app";
import { CreateOrderInputDto } from "../../src/use-cases/create-order/ICreateOrderUseCase";

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

  it("should receive bad request if missing any field", async () => {
    let res: supertest.Response;
    //@ts-ignore
    let reqBody: CreateOrderInputDto = {};

    // missing date
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order");
    reqBody.date = new Date().toISOString();

    // missing items
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order");
    reqBody.items = [];
    // items are empty
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order");
    //@ts-ignore
    reqBody.items = [{}];

    // missing supplierId
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order item");
    reqBody.items = [
      //@ts-ignore
      {
        supplierId: "supplierId",
      },
    ];

    // missing productId
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order item");
    reqBody.items = [
      //@ts-ignore
      {
        supplierId: "supplierId",
        productId: "productId",
      },
    ];

    // missing productName
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order item");
    reqBody.items = [
      //@ts-ignore
      {
        supplierId: "supplierId",
        productId: "productId",
        productName: "productName",
      },
    ];

    // missing unitPrice
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order item");
    reqBody.items = [
      //@ts-ignore
      {
        supplierId: "supplierId",
        productId: "productId",
        productName: "productName",
        unitPrice: 10.64,
      },
    ];

    // missing quantity
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order item");
    reqBody.items = [
      {
        supplierId: "supplierId",
        productId: "productId",
        productName: "productName",
        unitPrice: 10.64,
        quantity: 13,
      },
    ];

    // valid request body
    res = await supertest(app).post("/api/v1/order").send(reqBody);
    expect(res.statusCode).toBe(201);
  });

  it("should receive bad request if missing userId", async () => {});
  it("should receive bad request if user not found", async () => {});
  it("should receive bad request if any invalid field", async () => {});
});
