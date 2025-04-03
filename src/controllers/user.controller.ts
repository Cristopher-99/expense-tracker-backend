import { Request, Response } from "express";
import { User } from "../models/User";
import { Expense } from "../models/Expense";

export class UserController {
  // Crear un usuario
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({ name, email, password });
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al crear el usuario" });
    }
  }

  // Obtener un usuario por ID
  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, { include: [{ model: Expense }] });
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener el usuario" });
    }
  }

  // Obtener todos los usuarios
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({ include: [{ model: Expense }] });
      return res.json(users);
    } catch (error) {
      console.log(error);
      console.error("❌ Error al obtener usuarios:", error);
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }
}
