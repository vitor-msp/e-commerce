import { DataSource } from "typeorm";
import { createDatabase } from "typeorm-extension";

export class DBConnector {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly options: any
  ) {}

  public async connect(): Promise<void> {
    await createDatabase({
      options: this.options,
      ifNotExist: true,
    });
    await this.dataSource
      .initialize()
      .then(() => {
        console.log("connected to PostgreSQL");
      })
      .catch((error) => {
        console.error(`error to connect to PostgreSQL: ${error}`);
      });
  }
}
