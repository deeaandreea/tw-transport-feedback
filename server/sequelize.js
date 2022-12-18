const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./sqlite/transport.db"
});

sequelize.sync({ alter: true }).then(() => {
    console.group('All models were synchronized successfully');
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message)
});

module.exports = sequelize;