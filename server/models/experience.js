const { DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

const Experience = sequelize.define(
    "Experience",
    {
        startingPoint: DataTypes.STRING(50),
        destinationPoint: DataTypes.STRING(50),
        departureTime: DataTypes.DATE,
        duration: DataTypes.INTEGER,
        crowdingDegree: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        observations: {
            type: DataTypes.STRING(250),
            len: [2, 250]
        },
        satisfactionLevel: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            values: [1,2,3,4,5],
            validate: {
                isIn: {
                    args: [[1,2,3,4,5]],
                    msg: 'The satisfaction level must be an integer value between 1 and 5'
                }
            }
        }
    },
    {tableName: "Experiences"}
)

module.exports = Experience;