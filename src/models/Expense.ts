import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { Category } from "./Category"; // Importamos Category para la relación

@Table
export class Expense extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number; // ID único del gasto

  @Column({ allowNull: false })
  amount!: number; // Monto del gasto

  @Column({ allowNull: false })
  date!: Date; // Fecha del gasto

  // Relación con el Usuario (Cada gasto pertenece a un usuario)
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  // Relación con Categoría (Cada gasto pertenece a una categoría)
  @ForeignKey(() => Category)
  @Column({ allowNull: true }) // Permitir que sea opcional
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;
}
