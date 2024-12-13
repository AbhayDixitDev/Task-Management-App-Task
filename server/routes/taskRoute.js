const express = require('express');
const Task = require('../models/taskModel');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            userId: req.user.id,
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, priority },
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;