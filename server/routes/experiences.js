const { application } = require("express");
const Experience = require("../models/experience");
const Line = require("../models/line");
const User = require("../models/user");

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
            console.log(req.body);
            const line = await Line.findByPk(req.body.lineId);
            if (line) {
                const user = await User.findByPk(req.body.userId);
                if (user) {
                    const newExperience = new Experience(req.body);
                    newExperience.lineId = req.body.lineId;
                    newExperience.userId = req.body.userId;
                    await newExperience.save();
                    res.status(200).json(newExperience);
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } else {
                res.status(404).json({ message: 'Line not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    })

experiencesRouter.route("/:eid")
    .get(async (req, res) => {
        try {
            const experience = await Experience.findByPk(req.params.eid);
            if (experience) {
                res.status(200).json(experience);
            } else {
                res.status(404).json({ message: 'Experience not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const experience = await Experience.findByPk(req.params.eid);
            if (experience) {
                await experience.update(req.body, { fields: ['userId', 'lineId', 'departureTime', 'duration', 'crowdingDegree', 'observations', 'satisfactionLevel'] });
                res.status(202).json({message: "Experience with id = " + req.params.eid + " was updated"});
            } else {
                res.status(404).json({ message: 'Experience not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const experience = await Experience.findByPk(req.params.eid);
            if (experience) {
                await experience.destroy();
                res.status(202).json({message: "Experience with id = " + req.params.eid + " was deleted"});
            } else {
                res.status(404).json({ message: 'Experience not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    })

module.exports = experiencesRouter;