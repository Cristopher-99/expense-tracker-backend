import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Expense } from "./Expense"; // Importamos Expense para definir la relación

@Table
export class Category extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number; // ID único de la categoría

  @Column({ allowNull: false, unique: true })
  name!: string; // Nombre de la categoría (Ej: "Alimentos", "Transporte")

  // Relación con Expense (1 Categoría puede tener muchos Gastos)
  @HasMany(() => Expense)
  expenses!: Expense[];
}
