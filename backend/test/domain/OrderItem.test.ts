import { User } from "../../src/domain/entities/user/User";
import { Order } from "../../src/domain/entities/order/Order";
import uuidValidate from "uuid-validate";
import { OrderError } from "../../src/errors/OrderError";
import { OrderItem } from "../../src/domain/entities/order/OrderItem";

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
});
