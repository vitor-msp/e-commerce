import { OrdersRepositoryPG } from "../../src/repositories/orders/OrdersRepositoryPG";
import { UsersRepositoryPG } from "../../src/repositories/users/UsersRepositoryPG";
import { CreateOrderUseCase } from "../../src/use-cases/create-order/CreateOrderUseCase";
import { CreateOrderInput } from "../../src/use-cases/create-order/CreateOrderInput";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { Role } from "../../src/domain/value-objects/Role";

jest.mock("../../src/repositories/orders/OrdersRepositoryPG");
jest.mock("../../src/repositories/users/UsersRepositoryPG");

const OrdersRepositoryPGMock =
  OrdersRepositoryPG as jest.Mock<OrdersRepositoryPG>;
const UsersRepositoryPGMock = UsersRepositoryPG as jest.Mock<UsersRepositoryPG>;

const makeSut = () => {
  const ordersRepositoryPGMock =
    new OrdersRepositoryPGMock() as jest.Mocked<OrdersRepositoryPG>;
  const usersRepositoryPGMock =
    new UsersRepositoryPGMock() as jest.Mocked<UsersRepositoryPG>;
  const sut = new CreateOrderUseCase(
    ordersRepositoryPGMock,
    usersRepositoryPGMock
  );
  return { sut, ordersRepositoryPGMock, usersRepositoryPGMock };
};

const USER_ID: string = "1";
const USER_EMAIL: string = "teste@teste.com";
const ORDER_ID: string = "1";
const PRODUCT_ID: string = "1";
const PRODUCT_NAME: string = "product";
const SUPPLIER_ID: string = "1";
const QUANTITY: number = 2;
const UNIT_PRICE: number = 10.5;

const getCreateOrderInputExample = (): CreateOrderInput => {
  return new CreateOrderInput({
    userId: USER_ID,
    items: [
      {
        supplierId: SUPPLIER_ID,
        productId: PRODUCT_ID,
        productName: PRODUCT_NAME,
        unitPrice: UNIT_PRICE,
        quantity: QUANTITY,
      },
    ],
  });
};

const getUserExample = (): User => {
  return new User(UserFields.rebuild(USER_ID, USER_EMAIL, Role.Customer));
};

describe("Create Order Use Case Tests", () => {
  let sut: CreateOrderUseCase;
  let ordersRepositoryPGMock: jest.Mocked<OrdersRepositoryPG>;
  let usersRepositoryPGMock: jest.Mocked<UsersRepositoryPG>;

  beforeAll(() => {
    const mocks = makeSut();
    sut = mocks.sut;
    ordersRepositoryPGMock = mocks.ordersRepositoryPGMock;
    usersRepositoryPGMock = mocks.usersRepositoryPGMock;
  });

  it("should throw error when user not found", () => {
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(null);

    expect(
      async () => await sut.execute(getCreateOrderInputExample())
    ).rejects.toThrowError("user not found");

    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith(USER_ID);
    expect(ordersRepositoryPGMock.insert).toHaveBeenCalledTimes(0);
  });

  it("should create order", async () => {
    const user = getUserExample();
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(user);
    ordersRepositoryPGMock.insert.mockResolvedValueOnce({ orderId: ORDER_ID });

    const output = await sut.execute(getCreateOrderInputExample());

    expect(output).toEqual({ orderId: ORDER_ID });
    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith(USER_ID);
    expect(ordersRepositoryPGMock.insert).toHaveBeenCalledTimes(1);
    const expectedOrderToSave = expect.objectContaining({
      fields: {
        id: expect.any(String),
        createdAt: expect.any(Date),
      },
      user,
      items: [
        {
          fields: {
            supplierId: SUPPLIER_ID,
            productId: PRODUCT_ID,
            productName: PRODUCT_NAME,
            unitPrice: UNIT_PRICE,
            quantity: QUANTITY,
          },
        },
      ],
    });
    expect(ordersRepositoryPGMock.insert).toHaveBeenCalledWith(
      expectedOrderToSave
    );
  });
});
