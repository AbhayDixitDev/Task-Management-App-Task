const express = require('express');
const router = express.Router();
const user = require('../models/usersModel');
const authorization = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        if(userData.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });
        console.log(token);

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

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            { name, username, password },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/change-password', async (req, res) => {
    const { currentPassword, newPassword , username} = req.body;

    try {
        console.log(currentPassword);
        const user1 = await user.findOne({username});
        console.log(user1);

        if(!user1) {
            return res.status(400).json({ message: 'User not found' });
        }

        if(user1.password != currentPassword) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        if (user1.password == newPassword) {
            return res.status(400).json({ message: 'New password cannot be the same as the current password' });
        }

        

        await user.findByIdAndUpdate(user1._id, { password: newPassword });

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
