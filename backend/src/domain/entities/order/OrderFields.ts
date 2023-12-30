import * as uuid from "uuid";

export class OrderFields {
  private constructor(
    private readonly id: string,
    private readonly createdAt: Date
  ) {}

  public static build(): OrderFields {
    return new OrderFields(uuid.v4(), new Date());
  }

  public static rebuild(id: string, createdAt: Date): OrderFields {
    return new OrderFields(id, createdAt);
  }

  public getData() {
    return {
      id: this.id,
      createdAt: this.createdAt,
    };
  }
}
