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
            values: [1,2,3,4,5]
        }
    },
    {tableName: "Experiences"}
)

module.exports = Experience;