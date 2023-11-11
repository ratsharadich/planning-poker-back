import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB;
  private POSTGRES_HOST = process.env.POSTGRES_HOST;
  private POSTGRES_PORT = process.env.POSTGRES_PORT;
  private POSTGRES_USER = process.env.POSTGRES_USER;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

  constructor() {
    this.connectToPostgresSql();
  }

  private async connectToPostgresSql() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: Number(this.POSTGRES_PORT),
      dialect: "postgres",
    });

    await this.sequelize
      .authenticate()
      .then(() =>
        console.log("✅ PostgreSQL connection has been established successully")
      )
      .catch((error) =>
        console.log("❌ Unable to connect to postgreSQL database", error)
      );
  }
}

export default Database;
