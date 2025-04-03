import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Expense } from "./Expense";

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
}
