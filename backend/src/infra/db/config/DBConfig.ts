import { DataSourceOptions } from "typeorm";
import { createDatabase } from "typeorm-extension";
import { database } from "../../../main/factory";
import { UserDB } from "../schemas/UserDB";
import dotenv from "dotenv";
import { OrderDB } from "../schemas/OrderDB";
import { OrderItemDB } from "../schemas/OrderItemDB";

export abstract class DBConfig {
  public static async connect(): Promise<void> {
    await createDatabase({
      options: this.getOptions(),
      ifNotExist: true,
    });
    await database
      .initialize()
      .then(() => {
        console.log("connected to PostgreSQL");
      })
      .catch((error) => {
        console.log(`error to connect to PostgreSQL: ${error}`);
        console.error(error.stack);
      });
  }

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
