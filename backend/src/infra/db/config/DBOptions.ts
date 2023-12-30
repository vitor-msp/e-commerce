import { DataSourceOptions } from "typeorm";
import { UserDB } from "../schemas/UserDB";
import dotenv from "dotenv";
import { OrderDB } from "../schemas/OrderDB";
import { OrderItemDB } from "../schemas/OrderItemDB";

export abstract class DBOptions {
  public static getOptions(): DataSourceOptions {
    dotenv.config();
    if (
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASSWORD ||
      !process.env.DB_NAME
    )
      throw new Error("missing env variables to setup db");
    const DB_PORT: number = +process.env.DB_PORT;
    return {
      type: "postgres",
      host: process.env.DB_HOST,
      port: DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserDB, OrderDB, OrderItemDB],
      synchronize: true,
      logging: false,
      ssl: false,
    };
  }
}
