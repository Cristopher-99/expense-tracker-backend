import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import sequelize from "./config/database";
import userRoutes from "./routes/user.routes";
import expenseRoutes from "./routes/expense.routes";
import categoryRoutes from "./routes/category.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(express.json()); // Para parsear JSON en las peticiones
app.use(cors()); // Habilitar CORS si el frontend está en otro dominio
app.use(bodyParser.json());

// app.get("/", (req, res) => res.send("API Running..."));

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Connected to PostgreSQL");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Database error:", err));
