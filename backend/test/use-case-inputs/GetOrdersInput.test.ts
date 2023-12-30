import { ApplicationError } from "../../src/errors/ApplicationError";
import { GetOrdersInput } from "../../src/use-cases/get-orders/GetOrdersInput";

describe("Get Orders Input Tests", () => {
  it("should throw error when missing userId", () => {
    const input = {};
    expect(() => new GetOrdersInput(input)).toThrow(ApplicationError);
  });

  it("should throw error when userId is empty", () => {
    const input = { userId: "" };
    expect(() => new GetOrdersInput(input)).toThrow(ApplicationError);
  });
});
