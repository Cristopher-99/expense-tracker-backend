import {
  Table,
  Column,
  Model,
  HasMany,
  BeforeCreate,
} from "sequelize-typescript";
import { Expense } from "./Expense";
import * as bcrypt from "bcrypt";

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ unique: true, allowNull: false })
  email!: string;

  @Column({ allowNull: false })
  password!: string;

  @Column({ allowNull: false })
  name!: string;

  // Relación con Expense (Un usuario tiene muchos gastos)
  @HasMany(() => Expense)
  expenses!: Expense[];

  // Antes de crear el usuario, hashear la contraseña
  @BeforeCreate
  static async hashPassword(user: User) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
}
