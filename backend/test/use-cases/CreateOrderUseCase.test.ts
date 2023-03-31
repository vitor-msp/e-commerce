import express from "express";
import supertest from "supertest";
import { Repository } from "typeorm";
import { OrderDB } from "../../src/infra/db/schemas/OrderDB";
import { OrderItemDB } from "../../src/infra/db/schemas/OrderItemDB";
import { UserDB } from "../../src/infra/db/schemas/UserDB";
import { App } from "../../src/main/app";
import { database } from "../../src/main/factory";
import { JwtPayload } from "../../src/use-cases/auth-user/AuthUserUseCase";
import { CreateOrderInputDto } from "../../src/use-cases/create-order/ICreateOrderUseCase";
import { EncryptData } from "../../src/utils/EncryptData";
import { GenerateJwt } from "../../src/utils/GenerateJwt";

describe("Create Order Use Case Tests", () => {
  let app: express.Application;
  let ordersRepository: Repository<OrderDB>;
  let jwt: string;
  const DEFAULT_DATE = new Date().toISOString();
  beforeAll(async () => {
    app = (await new App().run()).express;
    const jwtPayload: JwtPayload = {
      userId: "1",
    };
    jwt = GenerateJwt.execute(jwtPayload);
    await database.createQueryBuilder().delete().from(OrderItemDB).execute();
    await database.createQueryBuilder().delete().from(OrderDB).execute();
    ordersRepository = database.getRepository(OrderDB);
    await generateUser();
    await generateOrder1();
    await generateOrder2();
    await generateOrder3();
  });

  const generateUser = async (): Promise<void> => {
    const usersRepository = database.getRepository(UserDB);
    await usersRepository.clear();
    const user = new UserDB();
    user.id = "1";
    user.email = "teste@teste.com";
    user.password = EncryptData.execute("teste123");
    await usersRepository.save(user);
  };

  const generateOrder1 = async (): Promise<void> => {
    const order = new OrderDB();
    order.id = "99";
    order.date = new Date().toISOString();
    order.user = "99";
    const orderItems: OrderItemDB[] = [];
    const orderItem = new OrderItemDB();
    orderItem.supplierId = "supplierId";
    orderItem.productId = "productId";
    orderItem.productName = "productName";
    orderItem.unitPrice = 10.64;
    orderItem.quantity = 13;
    orderItems.push(orderItem);
    order.items = orderItems;
    await ordersRepository.save(order);
  };

  const generateOrder2 = async (): Promise<void> => {
    const order = new OrderDB();
    order.id = "100";
    order.date = DEFAULT_DATE;
    order.user = "100";
    const orderItems: OrderItemDB[] = [];

    const orderItem1 = new OrderItemDB();
    orderItem1.supplierId = "1";
    orderItem1.productId = "1";
    orderItem1.productName = "productName";
    orderItem1.unitPrice = 10.5;
    orderItem1.quantity = 10;
    orderItems.push(orderItem1);

    const orderItem2 = new OrderItemDB();
    orderItem2.supplierId = "2";
    orderItem2.productId = "2";
    orderItem2.productName = "productName";
    orderItem2.unitPrice = 10.5;
    orderItem2.quantity = 10;
    orderItems.push(orderItem2);

    order.items = orderItems;
    await ordersRepository.save(order);
  };

  const generateOrder3 = async (): Promise<void> => {
    const order = new OrderDB();
    order.id = "101";
    order.date = DEFAULT_DATE;
    order.user = "100";
    const orderItems: OrderItemDB[] = [];
    const orderItem = new OrderItemDB();
    orderItem.supplierId = "3";
    orderItem.productId = "3";
    orderItem.productName = "productName";
    orderItem.unitPrice = 10.5;
    orderItem.quantity = 10;
    orderItems.push(orderItem);
    order.items = orderItems;
    await ordersRepository.save(order);
  };

  it("should receive created for a valid order", async () => {
    const date = new Date().toISOString();
    const supplierId = "supplier-id";
    const productId = "product-id";
    const productName = "product-name";
    const unitPrice = 15.62;
    const quantity = 5;
    const reqBody = {
      date,
      items: [
        {
          supplierId,
          productId,
          productName,
          unitPrice,
          quantity,
        },
      ],
    };
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("orderId");

    const orderId = res.body.orderId;
    const savedOrder = (
      await ordersRepository.find({
        where: { id: orderId },
        relations: { items: true },
      })
    )[0];
    expect(savedOrder!.id === orderId).toBe(true);
    expect(savedOrder!.date === date).toBe(true);
    expect(savedOrder!.user === "1").toBe(true);
    expect(savedOrder!.items.length === 1).toBe(true);

    const item = savedOrder!.items[0];
    expect(item.supplierId === supplierId).toBe(true);
    expect(item.productId === productId).toBe(true);
    expect(item.productName === productName).toBe(true);
    expect(item.quantity === quantity).toBe(true);
    expect(+item.unitPrice === unitPrice).toBe(true);
  });

  it("should receive bad request if missing any field", async () => {
    let res: supertest.Response;
    //@ts-ignore
    let reqBody: CreateOrderInputDto = {};

    // missing date
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order");
    reqBody.date = new Date().toISOString();

    // missing items
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order");
    reqBody.items = [];
    // items are empty
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid order");
    //@ts-ignore
    reqBody.items = [{}];

    // missing supplierId
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
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
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
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
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
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
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
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
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
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
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(201);
  });

  it("should receive bad request if any invalid field", async () => {
    let res: supertest.Response;
    let reqBody: CreateOrderInputDto;
    //@ts-ignore
    const validBody: CreateOrderInputDto = {
      date: new Date().toISOString(),
      items: [
        {
          supplierId: "supplierId",
          productId: "productId",
          productName: "productName",
          unitPrice: 10.64,
          quantity: 13,
        },
      ],
    };

    // invalid date
    reqBody = Object.assign({}, validBody);
    reqBody.date = "invalid";
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid date");

    // invalid unitPrice
    reqBody = Object.assign({}, validBody);
    //@ts-ignore
    reqBody.items[0].unitPrice = "invalid";
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid unitPrice");

    // invalid quantity
    reqBody = Object.assign({}, validBody);
    //@ts-ignore
    reqBody.items[0].unitPrice = 10.65;
    //@ts-ignore
    reqBody.items[0].quantity = "invalid";
    res = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("invalid quantity");
  });

  it("should receive bad request if user not found", async () => {
    //@ts-ignore
    const reqBody: CreateOrderInputDto = {
      date: new Date().toISOString(),
      items: [
        {
          supplierId: "supplierId",
          productId: "productId",
          productName: "productName",
          unitPrice: 10.64,
          quantity: 13,
        },
      ],
    };
    const jwtPayload: JwtPayload = {
      userId: "100",
    };
    const jwt = GenerateJwt.execute(jwtPayload);
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
    expect(res.body.errorMessage).toBe("user not found");
  });

  afterAll(async () => {
    await database.destroy();
  });
});
