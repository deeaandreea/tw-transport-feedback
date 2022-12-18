const Experience = require("../models/experience");
const Line = require("../models/line");

const linesRouter = require("express").Router();

linesRouter.route("/")
    .get(async (req, res) => {
        try {
            const lines = await Line.findAll();
            return res.status(200).json(lines);
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newLine = await Line.create(req.body);
            return res.status(200).json(newLine);
        }catch(err) {
            return res.status(500).json(err);
        }
    })

linesRouter.route("/:lid")
    .get(async (req, res) => {
        try {
            const line = await Line.findByPk(req.params.lid);
            if (line) {
                res.status(200).json(line);
            } else {
                res.status(404).json({ message: 'Line not nound' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

linesRouter.route("/:lid/experiences")
    .get(async (req, res) => {
        try {
            const line = await Line.findByPk(req.params.lid);
            if (line) {
                const experiences = await line.getExperiences();
                res.status(200).json(experiences);
            } else {
                res.status(404).json({ message: 'Line not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

module.exports = linesRouter;