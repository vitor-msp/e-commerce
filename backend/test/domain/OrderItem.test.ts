import { OrderItem } from "../../src/domain/entities/order/OrderItem";
import { OrderItemFields } from "../../src/domain/entities/order/OrderItemFields";
import { OrderItemError } from "../../src/errors/OrderItemError";

describe("Order Item Tests", () => {
  it("should create order item", () => {
    const supplierId = "supplier-id";
    const productId = "product-id";
    const productName = "product";
    const unitPrice = 15.59;
    const quantity = 3;
    const orderItem = new OrderItem(
      OrderItemFields.build({
        supplierId,
        productId,
        productName,
        unitPrice,
        quantity,
      })
    );
    const savedOrderItem = orderItem.getFields().getData();
    expect(savedOrderItem.supplierId).toBe(supplierId);
    expect(savedOrderItem.productId).toBe(productId);
    expect(savedOrderItem.productName).toBe(productName);
    expect(savedOrderItem.unitPrice).toBe(unitPrice);
    expect(savedOrderItem.quantity).toBe(quantity);
  });

  it("should not create order item with blank/invalid supplierId", () => {
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          productId: "product-id",
          productName: "product-name",
          unitPrice: 15.62,
          quantity: 5,
        })
      );
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "",
          productId: "product-id",
          productName: "product-name",
          unitPrice: 15.62,
          quantity: 5,
        })
      );
    }).toThrow(OrderItemError);
  });

  it("should not create order item with blank/invalid productId", () => {
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "supplierId",
          productName: "product-name",
          unitPrice: 15.62,
          quantity: 5,
        })
      );
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "supplierId",
          productId: "",
          productName: "product-name",
          unitPrice: 15.62,
          quantity: 5,
        })
      );
    }).toThrow(OrderItemError);
  });

  it("should not create order item with blank/invalid productName", () => {
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "supplierId",
          productId: "product-id",
          unitPrice: 15.62,
          quantity: 5,
        })
      );
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "supplierId",
          productId: "product-id",
          productName: "",
          unitPrice: 15.62,
          quantity: 5,
        })
      );
    }).toThrow(OrderItemError);
  });

  it("should not create order item with blank/invalid unitPrice", () => {
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "supplierId",
          productId: "product-id",
          productName: "product-name",
          quantity: 5,
        })
      );
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "supplierId",
          productId: "product-id",
          productName: "product-name",
          unitPrice: "invalid",
          quantity: 5,
        })
      );
    }).toThrow(OrderItemError);
  });

  it("should not create order item with blank/invalid quantity", () => {
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "supplierId",
          productId: "product-id",
          productName: "product-name",
          unitPrice: 15.62,
        })
      );
    }).toThrow(OrderItemError);
    expect(() => {
      new OrderItem(
        OrderItemFields.build({
          supplierId: "supplierId",
          productId: "product-id",
          productName: "product-name",
          unitPrice: 15.62,
          quantity: "invalid",
        })
      );
    }).toThrow(OrderItemError);
  });
});
