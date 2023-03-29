import { User } from "../../src/domain/entities/user/User";
import { Order } from "../../src/domain/entities/order/Order";
import uuidValidate from "uuid-validate";
import { OrderError } from "../../src/errors/OrderError";
import { OrderItem } from "../../src/domain/entities/order/OrderItem";

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

  it("should create order with id", () => {
    const id = "order-id";
    const user = getUserExample();
    const date = new Date().toISOString();
    const order = new Order({
      id,
      user,
      date,
    });
    const savedOrder = order.getData();
    expect(savedOrder.id).toBe(id);
    expect(savedOrder.user).toEqual(user);
    expect(savedOrder.date).toBe(date);
    expect(savedOrder.items.length === 0).toBe(true);
  });

  it("should not create order with blank date", () => {
    expect(() => {
      new Order({
        id: "order-id",
        user: getUserExample(),
        date: "",
      });
    }).toThrow(OrderError);
  });

  it("should not create order with invalid date", () => {
    expect(() => {
      new Order({
        id: "order-id",
        user: getUserExample(),
        date: "invalid-date",
      });
    }).toThrow(OrderError);
  });

  it("should not create order with invalid user", () => {
    expect(() => {
      new Order({
        id: "order-id",
        //@ts-ignore
        user: {},
        date: new Date().toISOString(),
      });
    }).toThrow(OrderError);
  });

  it("should add item into order", () => {
    const order = new Order({
      user: getUserExample(),
      date: new Date().toISOString(),
    });
    const item0 = new OrderItem({
      supplierId: "supplierId0",
      productId: "product-id0",
      productName: "product-name0",
      unitPrice: 10.0,
      quantity: 10,
    });
    const item1 = new OrderItem({
      supplierId: "supplierId1",
      productId: "product-id1",
      productName: "product-name1",
      unitPrice: 11.11,
      quantity: 11,
    });
    order.addItem(item0);
    order.addItem(item1);
    const savedOrder = order.getData();
    expect(savedOrder.items.length === 2).toBe(true);
    expect(savedOrder.items[0]).toEqual(item0);
    expect(savedOrder.items[1]).toEqual(item1);
  });

  it("should not add invalid item into order", () => {
    const order = new Order({
      user: getUserExample(),
      date: new Date().toISOString(),
    });
    const savedOrder = order.getData();
    expect(() => {
      //@ts-ignore
      order.addItem("item0");
    }).toThrow(OrderError);
    expect(savedOrder.items.length === 0).toBe(true);
    expect(() => {
      //@ts-ignore
      order.addItem(1);
    }).toThrow(OrderError);
    expect(savedOrder.items.length === 0).toBe(true);
  });
});
