import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();

export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ["src/entity/*.ts"],
  synchronize: true,
});
