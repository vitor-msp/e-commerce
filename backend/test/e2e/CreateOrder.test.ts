import express from "express";
import supertest from "supertest";
import { DataSource, Repository } from "typeorm";
import { OrderDB } from "../../src/infra/db/schemas/OrderDB";
import { OrderItemDB } from "../../src/infra/db/schemas/OrderItemDB";
import { UserDB } from "../../src/infra/db/schemas/UserDB";
import { App } from "../../src/main/App";
import { CreateOrderInput } from "../../src/use-cases/create-order/CreateOrderInput";
import { IPasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/IPasswordEncryptor";
import { PasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/PasswordEncryptor";
import { IJwtGenerator } from "../../src/use-cases/utils/jwt-generator/IJwtGenerator";
import { JwtGenerator } from "../../src/use-cases/utils/jwt-generator/JwtGenerator";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { User } from "../../src/domain/entities/user/User";

describe("Create Order Tests", () => {
  let app: express.Application;
  let dataSource: DataSource;
  let ordersRepository: Repository<OrderDB>;
  let jwt: string;
  const DEFAULT_DATE = new Date().toISOString();
  let userId: string;
  const passwordEncryptor: IPasswordEncryptor = new PasswordEncryptor();
  const jwtGenerator: IJwtGenerator = new JwtGenerator();

  beforeAll(async () => {
    const application = await new App().run();
    app = application.express;
    dataSource = application.getDataSource();
    await dataSource.createQueryBuilder().delete().from(OrderItemDB).execute();
    await dataSource.createQueryBuilder().delete().from(OrderDB).execute();
    ordersRepository = dataSource.getRepository(OrderDB);
    await generateUser();
    await generateOrder1();
    await generateOrder2();
    await generateOrder3();
    jwt = jwtGenerator.generate({
      userId,
    });
  });

  const generateUser = async (): Promise<void> => {
    const usersRepository = dataSource.getRepository(UserDB);
    await usersRepository.clear();
    const user = UserDB.build(
      new User(
        UserFields.build({
          email: "teste@teste.com",
          password: passwordEncryptor.generateHash("teste123"),
        })
      )
    );
    userId = user.id!;
    await usersRepository.save(user);
  };

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

  it("should receive created for a valid order", async () => {
    const supplierId = "supplier-id";
    const productId = "product-id";
    const productName = "product-name";
    const unitPrice = 15.62;
    const quantity = 5;
    const reqBody = {
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
    expect(savedOrder!.id === orderId).toBeTruthy();
    expect(savedOrder!.userId === userId).toBeTruthy();
    expect(savedOrder!.items!.length === 1).toBeTruthy();

    const item = savedOrder!.items![0];
    expect(item.supplierId === supplierId).toBeTruthy();
    expect(item.productId === productId).toBeTruthy();
    expect(item.productName === productName).toBeTruthy();
    expect(item.quantity === quantity).toBeTruthy();
    expect(+item.unitPrice! === unitPrice).toBeTruthy();
  });

  it("should receive bad request if user not found", async () => {
    const reqBody = {
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
    const jwt = jwtGenerator.generate({
      userId: "100",
    });
    const res: supertest.Response = await supertest(app)
      .post("/api/v1/order")
      .auth(jwt, { type: "bearer" })
      .send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errorMessage");
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
