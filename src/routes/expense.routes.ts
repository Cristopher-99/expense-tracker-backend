import { Router } from "express";
import { ExpenseController } from "../controllers/expense.controller";

const router = Router();

router.post("/create", ExpenseController.createExpense);
router.get("/all", ExpenseController.getAllExpenses);
router.get("/:id", ExpenseController.getExpenseById);
router.put("/:id", ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

export default router;
