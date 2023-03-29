import { OrderItem } from "../../src/domain/entities/order/OrderItem";
import { OrderItemError } from "../../src/errors/OrderItemError";

describe("Order Item Tests", () => {
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

  it("should not create order item with blank/invalid productId", () => {
    expect(() => {
      //@ts-ignore
      new OrderItem({
        supplierId: "supplierId",
        productName: "product-name",
        unitPrice: 15.62,
        quantity: 5,
      });
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem({
        supplierId: "supplierId",
        productId: "",
        productName: "product-name",
        unitPrice: 15.62,
        quantity: 5,
      });
    }).toThrow(OrderItemError);
  });

  it("should not create order item with blank/invalid productName", () => {
    expect(() => {
      //@ts-ignore
      new OrderItem({
        supplierId: "supplierId",
        productId: "product-id",
        unitPrice: 15.62,
        quantity: 5,
      });
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem({
        supplierId: "supplierId",
        productId: "product-id",
        productName: "",
        unitPrice: 15.62,
        quantity: 5,
      });
    }).toThrow(OrderItemError);
  });

  it("should not create order item with blank/invalid unitPrice", () => {
    expect(() => {
      //@ts-ignore
      new OrderItem({
        supplierId: "supplierId",
        productId: "product-id",
        productName: "product-name",
        quantity: 5,
      });
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem({
        supplierId: "supplierId",
        productId: "product-id",
        productName: "product-name",
        //@ts-ignore
        unitPrice: "invalid",
        quantity: 5,
      });
    }).toThrow(OrderItemError);
  });

  it("should not create order item with blank/invalid quantity", () => {
    expect(() => {
      //@ts-ignore
      new OrderItem({
        supplierId: "supplierId",
        productId: "product-id",
        productName: "product-name",
        unitPrice: 15.62,
      });
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem({
        supplierId: "supplierId",
        productId: "product-id",
        productName: "product-name",
        unitPrice: 15.62,
        //@ts-ignore
        quantity: "invalid",
      });
    }).toThrow(OrderItemError);
  });
});
