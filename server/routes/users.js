const User = require("../models/user");

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
            console.log(req.params.uid);
            const user = await User.findByPk(req.params.uid);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User Not Found' });
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

module.exports = usersRouter;