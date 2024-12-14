const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const { adminAuthorization } = require('../middlewares/auth'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/tasks', adminAuthorization, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const tasks = await Task.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
        const total = await Task.countDocuments({});
        res.send({
            tasks,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username !== 'abhaydixitdev' || password !== 'admin1234') {
        return res.status(401).send({ message: 'Invalid Admin credentials' });
    }

    const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
    });

    res.status(200).send({ message: 'Admin login successful' });
});


router.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.status(200).send({ message: 'Logged out successfully' });
});



module.exports = router;
