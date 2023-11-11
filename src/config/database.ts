import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import Room from "../models/room";
import User from "../models/user";
import Card from "../models/card";
import UserRoomAssociation from "../models/associations/user-room-association";

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
    try {
      this.sequelize = new Sequelize({
        database: this.POSTGRES_DB,
        username: this.POSTGRES_USER,
        password: this.POSTGRES_PASSWORD,
        host: this.POSTGRES_HOST,
        port: Number(this.POSTGRES_PORT),
        dialect: "postgres",
        models: [Room, User, Card, UserRoomAssociation],
      });

      await this.sequelize.authenticate();

      console.log("✅ PostgreSQL connection has been established successully");
    } catch (error) {
      console.log("❌ Unable to connect to postgreSQL database", error);
    }
  }
}

export default Database;
