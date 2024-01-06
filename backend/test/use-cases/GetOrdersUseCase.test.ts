import { Order } from "../../src/domain/entities/order/Order";
import { OrderFields } from "../../src/domain/entities/order/OrderFields";
import { OrderItem } from "../../src/domain/entities/order/OrderItem";
import { OrderItemFields } from "../../src/domain/entities/order/OrderItemFields";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { OrdersRepositoryPG } from "../../src/repositories/orders/OrdersRepositoryPG";
import { GetOrdersInput } from "../../src/use-cases/get-orders/GetOrdersInput";
import { GetOrdersOutput } from "../../src/use-cases/get-orders/GetOrdersOutput";
import { GetOrdersUseCase } from "../../src/use-cases/get-orders/GetOrdersUseCase";

jest.mock("../../src/repositories/orders/OrdersRepositoryPG");

const OrdersRepositoryPGMock =
  OrdersRepositoryPG as jest.Mock<OrdersRepositoryPG>;

const makeSut = () => {
  const ordersRepositoryPGMock =
    new OrdersRepositoryPGMock() as jest.Mocked<OrdersRepositoryPG>;
  const sut = new GetOrdersUseCase(ordersRepositoryPGMock);
  return { sut, ordersRepositoryPGMock };
};

const getUserExample = (): User => {
  return new User(UserFields.rebuild("1", "teste@teste.com"));
};

const ORDER_ID: string = "1";
const ORDER_CREATED_AT: Date = new Date();
const PRODUCT_ID: string = "1";
const PRODUCT_NAME: string = "product";
const SUPPLIER_ID: string = "1";
const QUANTITY: number = 2;
const UNIT_PRICE: number = 10.5;

const getOrderItemExample = (): OrderItem => {
  return new OrderItem(
    OrderItemFields.rebuild(
      SUPPLIER_ID,
      PRODUCT_ID,
      PRODUCT_NAME,
      UNIT_PRICE,
      QUANTITY
    )
  );
};

const getOrdersExample = (): Order[] => {
  const order = new Order(OrderFields.rebuild(ORDER_ID, ORDER_CREATED_AT));
  order.setUser(getUserExample());
  order.addItem(getOrderItemExample());
  return [order];
};

describe("Get Orders Use Case Tests", () => {
  let sut: GetOrdersUseCase;
  let ordersRepositoryPGMock: jest.Mocked<OrdersRepositoryPG>;

  beforeAll(() => {
    const mocks = makeSut();
    sut = mocks.sut;
    ordersRepositoryPGMock = mocks.ordersRepositoryPGMock;
  });

  it("should return empty orders list", async () => {
    ordersRepositoryPGMock.select.mockResolvedValueOnce([]);

    const output = await sut.execute(new GetOrdersInput({ userId: "1" }));

    const expectedOutput: GetOrdersOutput = {
      orders: [],
    };
    expect(output).toEqual(expectedOutput);
    expect(ordersRepositoryPGMock.select).toHaveBeenCalledTimes(1);
    expect(ordersRepositoryPGMock.select).toHaveBeenCalledWith("1");
  });

  it("should return orders list", async () => {
    ordersRepositoryPGMock.select.mockResolvedValueOnce(getOrdersExample());

    const output = await sut.execute(new GetOrdersInput({ userId: "1" }));

    const expectedOutput: GetOrdersOutput = {
      orders: [
        {
          id: ORDER_ID,
          createdAt: ORDER_CREATED_AT.toISOString(),
          items: [
            {
              productId: PRODUCT_ID,
              productName: PRODUCT_NAME,
              supplierId: SUPPLIER_ID,
              quantity: QUANTITY,
              unitPrice: UNIT_PRICE,
            },
          ],
        },
      ],
    };
    expect(output).toEqual(expectedOutput);
    expect(ordersRepositoryPGMock.select).toHaveBeenCalledTimes(1);
    expect(ordersRepositoryPGMock.select).toHaveBeenCalledWith("1");
  });
});
