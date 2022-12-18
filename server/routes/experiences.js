const { application } = require("express");
const Experience = require("../models/experience");

const experiencesRouter = require("express").Router();

experiencesRouter.route("/")
    .get(async (req, res) => {
        try {
            const experiences = await Experience.findAll();
            return res.status(200).json(experiences);
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newExperience = await Experience.create(req.body);
            return res.status(200).json(newExperience);
        }catch(err) {
            return res.status(500).json(err);
        }
    })

module.exports = experiencesRouter;