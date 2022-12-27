const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Line = sequelize.define(
    "Line",
    {
        id: {
            type: DataTypes.STRING(10),
            primaryKey: true
        },
        transportType: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['Autobuz', 'Tramvai', 'Troleibuz', 'Metrou'],
            validate: {
                isIn: {
                    args: [['Autobuz', 'Tramvai', 'Troleibuz', 'Metrou']],
                    msg: 'The transport type is invalid'
                }
            }
        },
        lineStart: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lineEnd: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {tableName: "Lines"}
)

module.exports = Line;