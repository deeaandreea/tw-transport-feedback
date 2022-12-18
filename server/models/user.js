const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define(
    "User",
    {
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        token: DataTypes.STRING(50),
        expiryDate: DataTypes.DATE,
        role: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['Admin', 'User']
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['Creat', 'Activ', 'Inactiv']
        }
    },
    {tableName: "Users"}
)

module.exports = User;