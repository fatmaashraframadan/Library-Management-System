import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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
                is: "^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$",
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
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            },
        }
    },
    {
        timestamps: false,
    }
);

export default Book;