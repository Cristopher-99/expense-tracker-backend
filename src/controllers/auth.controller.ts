import { Request, Response } from "express";
import { User } from "../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Expense } from "../models/Expense";

export class AuthController {
  // Registro de usuario
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }

      // Crear usuario (se hashea automáticamente)
      const newUser = await User.create({ name, email, password });

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al registrar usuario" });
    }
  }

  // Login de usuario
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Verificar si el usuario existe
      const user = await User.findOne({
        where: { email },
        include: [{ model: Expense }],
      });
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Comparar contraseñas
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d", // Token válido por 1 día
        }
      );

      return res.json({ token, user });
    } catch (error) {
      console.log("ERROR", error);
      return res.status(500).json({ error: "Error en el login" });
    }
  }
}
