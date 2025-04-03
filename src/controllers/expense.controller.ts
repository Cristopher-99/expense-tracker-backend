import { Request, Response } from "express";
import { Expense } from "../models/Expense";

export class ExpenseController {
  static async createExpense(req: Request, res: Response) {
    try {
      const { amount, categoryId, date, userId } = req.body;
      const expense = await Expense.create({
        amount,
        categoryId,
        date,
        userId,
      });
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: "Error creating expense", details: error });
    }
  }

  static async getAllExpenses(req: Request, res: Response) {
    try {
      const expenses = await Expense.findAll();
      res.json(expenses);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching expenses", details: error });
    }
  }

  static async getExpenseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const expense = await Expense.findByPk(id);
      if (!expense) return res.status(404).json({ error: "Expense not found" });
      res.json(expense);
    } catch (error) {
      res.status(500).json({ error: "Error fetching expense", details: error });
    }
  }

  static async updateExpense(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { amount, categoryId, date, userId } = req.body;
      const expense = await Expense.findByPk(id);
      if (!expense) return res.status(404).json({ error: "Expense not found" });

      await expense.update({ amount, categoryId, date, userId });
      res.json(expense);
    } catch (error) {
      res.status(500).json({ error: "Error updating expense", details: error });
    }
  }

  static async deleteExpense(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const expense = await Expense.findByPk(id);
      if (!expense) return res.status(404).json({ error: "Expense not found" });

      await expense.destroy();
      res.json({ message: "Expense deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting expense", details: error });
    }
  }
}
