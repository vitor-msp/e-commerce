import { User } from "../../src/domain/entities/user/User";
import { Order } from "../../src/domain/entities/order/Order";
import uuidValidate from "uuid-validate";

describe("Order Tests", () => {
  const getUserExample = () => {
    return new User({
      email: "  teste@teste.com  ",
      password: "teste123",
      id: "",
    });
  };

  it("should create order without id", () => {
    const user = getUserExample();
    const date = new Date().toISOString();
    const order = new Order({
      user,
      date,
    });
    const savedOrder = order.getData();
    expect(uuidValidate(savedOrder.id)).toBe(true);
    expect(savedOrder.user).toEqual(user);
    expect(savedOrder.date).toBe(date);
    expect(savedOrder.items.length === 0).toBe(true);
  });

  it("should create order with id", () => {});
  it("should not create order without date", () => {});
  it("should not create order with invalid date", () => {});
  it("should not create order without user", () => {});
  it("should not create order with invalid user", () => {});
  it("should add item into order", () => {});
});
