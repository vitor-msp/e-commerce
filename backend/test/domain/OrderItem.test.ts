import { OrderItem } from "../../src/domain/entities/order/OrderItem";
import { OrderItemFields } from "../../src/domain/entities/order/OrderItemFields";

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
});
