import { ApplicationError } from "../../src/errors/ApplicationError";
import { CreateOrderInput } from "../../src/use-cases/create-order/CreateOrderInput";

describe("Create Order Input Tests", () => {
  it("should throw error when missing userId", () => {
    const input = { items: [] };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when userId is empty", () => {
    const input = { userId: "", items: [] };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when missing items", () => {
    const input = { userId: "123" };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when items is empty", () => {
    const input = { userId: "123", items: "" };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when items is an empty array", () => {
    const input = { userId: "123", items: [] };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when missing supplierId", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when supplierId is empty", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          supplierId: "",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when missing productId", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          supplierId: "312",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when productId is empty", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when missing productName", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when productName is empty", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when missing unitPrice", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when unitPrice is empty", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: "",
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when unit price is not a number", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: "error",
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: 1,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when missing quantity", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when quantity is empty", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: "",
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when quantity is not a number", () => {
    const input = {
      userId: "123",
      items: [
        {
          supplierId: "321",
          productId: "123",
          productName: "pen",
          unitPrice: 1.56,
          quantity: 2,
        },
        {
          supplierId: "312",
          productId: "321",
          productName: "green car",
          unitPrice: 19990,
          quantity: "error",
        },
      ],
    };
    expect(() => new CreateOrderInput(input)).toThrow(ApplicationError);
  });
});
