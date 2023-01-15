const express = require("express");
const crypto = require("crypto");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.route("/login")
    .post(async (req, res) => {
        const credentials = req.body;
        try {
            const user = await User.findOne({
                where: {
                    username: credentials.username,
                    password: credentials.password
                }
            });
            if (user) {
                const token = crypto.randomBytes(64).toString('hex');
                user.token = token;
                // TODO user.expiryDate = sequelize.literal('NOW() + INTERVAL 12 hour');
                user.expiryDate = '2023-12-31';
                await user.save();
                res.status(200).json({ 
                    username: user.username, 
                    role: user.role,
                    token: user.token
                 });
            } else {
                res.status(401).json({ message: 'Invalid credentials' }) ;
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    });

    authRouter.route("/logout")
        .post(async (req, res) => {
            try {
                const token = req.headers.auth ? req.headers.auth : '';
                console.log(token);
                const user = await User.findOne({
                    where: {
                        token: token
                    }
                });
                if (user) {
                    user.token = '';
                    user.expiryDate = null;
                    await user.save();
                    res.status(200).json({ message: 'Logout success' });
                } else {
                    res.status(401).json({ message: 'Logout error' }) ;
                }
            } catch (err) {
                return res.status(500).json(err);
            }
        });

authRouter.route("/register")
    .post(async (req, res) => {
        const credentials = req.body;
        try {
            const user1 = await User.findOne({
                where: {
                    username: credentials.username
                }
            });
            const user2 = await User.findOne({
                where: {
                    email: credentials.email
                }
            });
            if (user1 || user2) {
                res.status(401).json({ message: 'Duplicated username or email' }) ;
            } else {
                // const newUser = await User.create(credentials);
                const newUser = new User();
                newUser.username = credentials.username;
                newUser.password = credentials.password;
                newUser.email = credentials.email;
                newUser.role = "User";
                newUser.status = "Activ";
                await newUser.save();
                return res.status(200).json(newUser);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    });
    
module.exports = authRouter;
