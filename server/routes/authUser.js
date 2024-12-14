const express = require('express');
const router = express.Router();
const user = require('../models/usersModel');
const authorization = require('../middlewares/auth');

router.get('/all', async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ name, username, password });

    user.create(newUser)
        .then(() => {
            res.status(201).json({ message: 'User registered successfully' });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Server error',
                error: err
            });
        });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userData = await user.findOne({ username });

        if (!userData) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;

