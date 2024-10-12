const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Client = sequelize.define("client", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
            isEmail: true,
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: true,
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    }
});

module.exports = Client;