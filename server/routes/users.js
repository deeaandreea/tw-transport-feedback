const User = require("../models/user");
const Experience = require("../models/experience");

const usersRouter = require("express").Router();

usersRouter.route("/")
    .get(async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            return res.status(200).json(newUser);
        } catch(err) {
            return res.status(500).json(err);
        }
    })

usersRouter.route("/:uid")
    .get(async (req, res) => {
        try {
            const user = await User.findByPk(req.params.uid);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const user = await User.findByPk(req.params.uid);
            if (user) {
                console.log(req.body);
                await user.update(req.body, { fields: ['password', 'role', 'email', 'status', 'expiryDate'] });
                res.status(202).json({message: "User with id = " + req.params.uid + " was updated"});
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const user = await User.findByPk(req.params.uid);
            if (user) {
                req.body.status = 'Inactiv';
                await user.update(req.body, { fields: ['status'] });
                res.status(202).json({message: "User with id = " + req.params.uid + " is now inactive"});
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

usersRouter.route("/:uid/experiences")
    .get(async (req, res) => {
        try {
            const user = await User.findByPk(req.params.uid);
            if (user) {
                console.log(user);
                const experiences = await user.getExperiences();
                res.status(200).json(experiences);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

module.exports = usersRouter;