const mongoose = require('mongoose');
const routes = require('express').Router();
const userModel = require('../models/user');

// User Signup
routes.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ status: false, message: 'Username or email already registered' });
        }

        const newUser = new userModel({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password,
        });

        await newUser.save();
        res.status(201).json({ status: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

// User Login
routes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid username or password' });
        }

        const isValidPassword = await userModel.findOne({ password });
        if (!isValidPassword) {
            return res.status(401).json({ status: false, message: 'Invalid username or password' });
        }


        res.status(200).json({
            status: true,
            message: 'User logged in successfully',
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = routes;