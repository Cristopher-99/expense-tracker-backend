# 💰 Expense Manager Backend

Este es el backend para el sistema de gestión de gastos, desarrollado con **Node.js**, **Express**, y **Sequelize** para manejar una base de datos **PostgreSQL**.

## 📌 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución para JavaScript.
- **Express.js** - Framework web para la creación de APIs.
- **Sequelize** - ORM para manejar la base de datos PostgreSQL.
- **PostgreSQL** - Base de datos relacional.
- **Docker** - Para contenerización del backend y base de datos.
- **TypeScript** - Para tipado estático y mejor mantenimiento del código.

---

## 🗂️ Modelo de Datos

El sistema maneja **tres entidades principales**:

### 1️⃣ **Usuarios (`Users`)**

Cada usuario puede registrar múltiples gastos.

| Campo    | Tipo            | Descripción           |
| -------- | --------------- | --------------------- |
| id       | INTEGER (PK)    | Identificador único   |
| name     | STRING          | Nombre del usuario    |
| email    | STRING (UNIQUE) | Correo electrónico    |
| password | STRING          | Contraseña encriptada |

🔗 **Relación:** Un usuario tiene **muchos gastos** (**1:N**).

---

### 2️⃣ **Gastos (`Expenses`)**

Cada gasto tiene una cantidad, fecha y pertenece a un usuario y una categoría.

| Campo      | Tipo         | Descripción             |
| ---------- | ------------ | ----------------------- |
| id         | INTEGER (PK) | Identificador único     |
| amount     | DECIMAL      | Monto del gasto         |
| date       | DATE         | Fecha del gasto         |
| userId     | INTEGER (FK) | Usuario que lo registró |
| categoryId | INTEGER (FK) | Categoría del gasto     |

🔗 **Relación:**

- Un gasto pertenece a **un usuario** (**N:1**).
- Un gasto pertenece a **una categoría** (**N:1**).

---

### 3️⃣ **Categorías (`Categories`)**

Cada gasto pertenece a una categoría.

| Campo | Tipo         | Descripción            |
| ----- | ------------ | ---------------------- |
| id    | INTEGER (PK) | Identificador único    |
| name  | STRING       | Nombre de la categoría |

🔗 **Relación:** Una categoría puede tener **muchos gastos** (**1:N**).

## 📌 Endpoints de la API

### 👤 Usuarios

POST /users/create → Crear un usuario
GET /users/:id → Obtener usuario por ID
GET /users/all → Obtener todos los usuarios

### 💰 Gastos

POST /expenses/create → Crear un gasto
GET /expenses/all → Obtener todos los gastos
GET /expenses/user/:userId → Obtener gastos de un usuario

### 🏷️ Categorías

POST /categories/create → Crear una categoría
GET /categories/all → Obtener todas las categorías

---

## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/tu-usuario/expense-backend.git
cd expense-backend
```
