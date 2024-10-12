import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define(
    "book",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            }
        },
        available_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: true,
                isInt: true,
            },
        },
        shelf_location: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        timestamps: false,
    }
);

export default Book;