const express = require('express');
const Task = require('../models/taskModel');
const authorization = require('../middlewares/auth');
const router = express.Router();

router.post('/', authorization, async (req, res) => {
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
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.get('/', authorization, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.put('/:id', authorization, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, priority },
            { new: true }
        );
        res.send(updatedTask);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.delete('/:id', authorization, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;

