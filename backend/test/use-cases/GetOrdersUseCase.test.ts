import express from "express";
import supertest from "supertest";
import { DataSource, Repository } from "typeorm";
import { OrderDB } from "../../src/infra/db/schemas/OrderDB";
import { OrderItemDB } from "../../src/infra/db/schemas/OrderItemDB";
import { App } from "../../src/main/App";
import { IJwtGenerator } from "../../src/utils/IJwtGenerator";
import { JwtGenerator } from "../../src/utils/JwtGenerator";
import { GetOrdersOrderOutput } from "../../src/use-cases/get-orders/GetOrdersOutput";

describe("Get Orders Use Case Tests", () => {
  let app: express.Application;
  let dataSource: DataSource;
  let ordersRepository: Repository<OrderDB>;
  const DEFAULT_DATE = new Date().toISOString();
  const jwtGenerator: IJwtGenerator = new JwtGenerator();

  beforeAll(async () => {
    const application = await new App().run();
    app = application.express;
    dataSource = application.getDataSource();
    await dataSource.createQueryBuilder().delete().from(OrderItemDB).execute();
    await dataSource.createQueryBuilder().delete().from(OrderDB).execute();
    ordersRepository = dataSource.getRepository(OrderDB);
    await generateOrder1();
    await generateOrder2();
    await generateOrder3();
  });

  const generateOrder1 = async (): Promise<void> => {
    const order = new OrderDB();
    order.id = "99";
    order.createdAt = new Date().toISOString();
    order.userId = "99";
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
    order.createdAt = DEFAULT_DATE;
    order.userId = "100";
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
    order.createdAt = DEFAULT_DATE;
    order.userId = "100";
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
    const jwt = jwtGenerator.generate({
      userId: "100",
    });
    const res: supertest.Response = await supertest(app)
      .get("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("orders");
    const savedOrders: GetOrdersOrderOutput[] = res.body.orders;

    const savedOrder0: GetOrdersOrderOutput = savedOrders[0];
    expect(savedOrder0.id === "100").toBe(true);
    expect(savedOrder0.createdAt === DEFAULT_DATE).toBe(true);
    console.log(savedOrder0.items.length);
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

    const savedOrder1: GetOrdersOrderOutput = savedOrders[1];
    expect(savedOrder1.id === "101").toBe(true);
    expect(savedOrder1.createdAt === DEFAULT_DATE).toBe(true);
    expect(savedOrder1.items.length === 1).toBe(true);

    const item3 = savedOrder1.items[0];
    expect(item3.supplierId === "3").toBe(true);
    expect(item3.productId === "3").toBe(true);
    expect(item3.productName === "productName").toBe(true);
    expect(item3.quantity === 10).toBe(true);
    expect(+item3.unitPrice === 10.5).toBe(true);
  });

  it("should receive ok with empty orders list", async () => {
    const jwt = jwtGenerator.generate({
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
    await dataSource.destroy();
  });
});
