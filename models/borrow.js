import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Book from "./book.js";
import User from "./user.js";

const Borrow = sequelize.define("borrow", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: { notNull: true, notEmpty: true },
        references: { model: "books", key: "id" },
    },
    borrowerId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: { notNull: true, notEmpty: true },
        references: { model: "users", key: "id" },
    },
    borrowedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    returnedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isReturned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

Borrow.belongsTo(Book, { foreignKey: "bookId", as: "book" });
Borrow.belongsTo(User, { foreignKey: "borrowerId", as: "user" });

export default Borrow;