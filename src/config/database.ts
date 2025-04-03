import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Expense } from "../models/Expense";

dotenv.config();

console.log("🟡 Conectando a:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const sequelize = new Sequelize(
  process.env.DB_NAME || "gestor_gastos",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "admin",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: console.log, // Para ver las consultas SQL
    models: [User, Expense, Category],
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error en Sequelize:", err));

export default sequelize;
