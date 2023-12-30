import { User } from "../../src/domain/entities/user/User";
import { Order } from "../../src/domain/entities/order/Order";
import { OrderItem } from "../../src/domain/entities/order/OrderItem";
import { UserFields } from "../../src/domain/entities/user/UserFields";
import { OrderFields } from "../../src/domain/entities/order/OrderFields";
import { OrderItemFields } from "../../src/domain/entities/order/OrderItemFields";

describe("Order Tests", () => {
  const getUserExample = () => {
    return new User(
      UserFields.build({
        email: "  teste@teste.com  ",
        password: "teste123",
      })
    );
  };

  it("should create order", () => {
    const user = getUserExample();
    const order = new Order(OrderFields.build());
    order.setUser(user);
    expect(order.getUser()).toEqual(user);
    expect(order.getItems().length === 0).toBe(true);
  });

  it("should add item into order", () => {
    const order = new Order(OrderFields.build());
    order.setUser(getUserExample());
    const item0 = new OrderItem(
      OrderItemFields.build({
        supplierId: "supplierId0",
        productId: "product-id0",
        productName: "product-name0",
        unitPrice: 10.0,
        quantity: 10,
      })
    );
    const item1 = new OrderItem(
      OrderItemFields.build({
        supplierId: "supplierId1",
        productId: "product-id1",
        productName: "product-name1",
        unitPrice: 11.11,
        quantity: 11,
      })
    );
    order.addItem(item0);
    order.addItem(item1);
    const items = order.getItems();
    expect(items.length === 2).toBe(true);
    expect(items[0]).toEqual(item0);
    expect(items[1]).toEqual(item1);
  });
});
