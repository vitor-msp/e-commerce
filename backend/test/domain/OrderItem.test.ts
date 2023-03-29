import { User } from "../../src/domain/entities/user/User";
import { Order } from "../../src/domain/entities/order/Order";
import uuidValidate from "uuid-validate";
import { OrderError } from "../../src/errors/OrderError";
import { OrderItem } from "../../src/domain/entities/order/OrderItem";
import { OrderItemError } from "../../src/errors/OrderItemError";

describe("Order Item Tests", () => {
  const getUserExample = () => {
    return new User({
      email: "  teste@teste.com  ",
      password: "teste123",
      id: "",
    });
  };

  it("should create order item", () => {
    const supplierId = "supplier-id";
    const productId = "product-id";
    const productName = "product";
    const unitPrice = 15.59;
    const quantity = 3;
    const orderItem = new OrderItem({
      supplierId,
      productId,
      productName,
      unitPrice,
      quantity,
    });
    const savedOrderItem = orderItem.getData();
    expect(savedOrderItem.supplierId).toBe(supplierId);
    expect(savedOrderItem.productId).toBe(productId);
    expect(savedOrderItem.productName).toBe(productName);
    expect(savedOrderItem.unitPrice).toBe(unitPrice);
    expect(savedOrderItem.quantity).toBe(quantity);
  });

  it("should not create order item with blank/invalid supplierId", () => {
    expect(() => {
      //@ts-ignore
      new OrderItem({
        productId: "product-id",
        productName: "product-name",
        unitPrice: 15.62,
        quantity: 5,
      });
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem({
        supplierId: "",
        productId: "product-id",
        productName: "product-name",
        unitPrice: 15.62,
        quantity: 5,
      });
    }).toThrow(OrderItemError);
  });

  it("should not create order item with blank/invalid productId", () => {});
  it("should not create order item with blank/invalid productName", () => {});
  it("should not create order item with blank/invalid unitPrice", () => {});
  it("should not create order item with blank/invalid quantity", () => {});
});
