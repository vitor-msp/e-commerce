import express from "express";
import supertest from "supertest";
import { Repository } from "typeorm";
import { OrderDB } from "../../src/infra/db/schemas/OrderDB";
import { OrderItemDB } from "../../src/infra/db/schemas/OrderItemDB";
import { App } from "../../src/main/app";
import { database } from "../../src/main/factory";
import { JwtPayload } from "../../src/use-cases/auth-user/AuthUserUseCase";
import { ThinOrder } from "../../src/use-cases/get-orders/IGetOrdersUseCase";
import { GenerateJwt } from "../../src/utils/GenerateJwt";

describe("Get Orders Use Case Tests", () => {
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
    await generateOrder1();
    await generateOrder2();
    await generateOrder3();
  });

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

  it("should receive ok with orders", async () => {
    const jwt = GenerateJwt.execute({
      userId: "100",
    });
    const res: supertest.Response = await supertest(app)
      .get("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("orders");
    const savedOrders: ThinOrder[] = res.body.orders;

    const savedOrder0: ThinOrder = savedOrders[0];
    expect(savedOrder0.id === "100").toBe(true);
    expect(savedOrder0.date === DEFAULT_DATE).toBe(true);
    expect(savedOrder0.items.length === 2).toBe(true);

    const item0 = savedOrder0.items[0];
    expect(item0.supplierId === "1").toBe(true);
    expect(item0.productId === "1").toBe(true);
    expect(item0.productName === "productName").toBe(true);
    expect(item0.quantity === 10).toBe(true);
    expect(+item0.unitPrice === 10.5).toBe(true);

    const item1 = savedOrder0.items[1];
    expect(item1.supplierId === "2").toBe(true);
    expect(item1.productId === "2").toBe(true);
    expect(item1.productName === "productName").toBe(true);
    expect(item1.quantity === 10).toBe(true);
    expect(+item1.unitPrice === 10.5).toBe(true);

    const savedOrder1: ThinOrder = savedOrders[1];
    expect(savedOrder1.id === "101").toBe(true);
    expect(savedOrder1.date === DEFAULT_DATE).toBe(true);
    expect(savedOrder1.items.length === 1).toBe(true);

    const item3 = savedOrder1.items[0];
    expect(item3.supplierId === "3").toBe(true);
    expect(item3.productId === "3").toBe(true);
    expect(item3.productName === "productName").toBe(true);
    expect(item3.quantity === 10).toBe(true);
    expect(+item3.unitPrice === 10.5).toBe(true);
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

  afterAll(async () => {
    await database.destroy();
  });
});
