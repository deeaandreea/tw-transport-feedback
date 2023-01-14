"use strict";

// initialize express
const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors());

// initialize sequelize
const sequelize = require("./sequelize")

// import created models
const User = require("./models/user");
const Line = require("./models/line");
const Experience = require("./models/experience");

// define the model relationship
Line.hasMany(Experience, {foreignKey: "lineId"});
Experience.belongsTo(Line, {foreignKey: "lineId"});
User.hasMany(Experience, {foreignKey: "userId"});
Experience.belongsTo(User, {foreignKey: "userId"});


// express midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require("./routes/users");
const linesRouter = require("./routes/lines");
const experiencesRouter = require("./routes/experiences");
app.use("/users", usersRouter);
app.use("/lines", linesRouter);
app.use("/experiences", experiencesRouter);


// set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}.`);
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully")
    } catch(err) {
        console.error("Unable to connect to the database: ", err);
    }
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Transport Feedback application" });
});
