import { OrdersRepositoryPG } from "../../src/repositories/orders/OrdersRepositoryPG";
import { UsersRepositoryPG } from "../../src/repositories/users/UsersRepositoryPG";
import { CreateOrderUseCase } from "../../src/use-cases/create-order/CreateOrderUseCase";
import { ApplicationError } from "../../src/errors/ApplicationError";
import { CreateOrderInput } from "../../src/use-cases/create-order/CreateOrderInput";
import { User } from "../../src/domain/entities/user/User";
import { UserFields } from "../../src/domain/entities/user/UserFields";

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

const getCreateOrderInputExample = (): CreateOrderInput => {
  return new CreateOrderInput({
    userId: "1",
    items: [
      {
        supplierId: "1",
        productId: "1",
        productName: "product",
        unitPrice: 10.5,
        quantity: 2,
      },
    ],
  });
};

const getUserExample = (): User => {
  return new User(UserFields.rebuild("1", "teste@teste.com"));
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
    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith("1");
    expect(ordersRepositoryPGMock.insert).toHaveBeenCalledTimes(0);
  });

  it("should create order", async () => {
    const user = getUserExample();
    usersRepositoryPGMock.selectById.mockResolvedValueOnce(user);
    ordersRepositoryPGMock.insert.mockResolvedValueOnce({ orderId: "1" });

    const output = await sut.execute(getCreateOrderInputExample());

    expect(output).toEqual({ orderId: "1" });
    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.selectById).toHaveBeenCalledWith("1");
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
            supplierId: "1",
            productId: "1",
            productName: "product",
            unitPrice: 10.5,
            quantity: 2,
          },
        },
      ],
    });
    expect(ordersRepositoryPGMock.insert).toHaveBeenCalledWith(
      expectedOrderToSave
    );
  });
});
