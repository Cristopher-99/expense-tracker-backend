import { Request, Response } from "express";
import { Category } from "../models/Category";
import { Expense } from "../models/Expense";

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating category", details: error });
    }
  }

  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await Category.findAll({
        include: [{ model: Expense }],
      });
      res.json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching categories", details: error });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });
      res.json(category);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching category", details: error });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findByPk(id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });

      await category.update({ name });
      res.json(category);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating category", details: error });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });

      await category.destroy();
      res.json({ message: "Category deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting category", details: error });
    }
  }
}
