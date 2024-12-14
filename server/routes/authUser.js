const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/usersModel');
const { adminAuthorization, authorization } = require('../middlewares/auth');
const router = express.Router();

router.post('/register',adminAuthorization, async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser  = await user.findOne({ username });
        if (existingUser ) {
            return res.status(400).send({ message: 'User  already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser  = await user.create({ name, username, password: hashedPassword });

        res.status(201).send({ message: 'User  registered successfully', newUser });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userData = await user.findOne({ username });

        if (!userData) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });

        res.status(200).send({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

router.get("/logout",authorization, (req, res) => {
    res.clearCookie("access_token");
    res.status(200).send({ message: "Logged out successfully" });
});

module.exports = router;



