const express = require('express');
const Task = require('../models/taskModel');
const { authorization, adminAuthorization } = require('../middlewares/auth'); 
const router = express.Router();

router.post('/create',adminAuthorization, async (req, res) => {
    const { title, description, dueDate, priority, userId } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            userId,
        });
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.get('/', authorization, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const tasks = await Task.find({ userId: req.user.id })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
        const total = await Task.countDocuments({ userId: req.user.id });
        res.send({
            tasks,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.get('/:id', authorization, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.put('/:id', adminAuthorization, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, priority },
            { new: true }
        );
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.delete('/:id', adminAuthorization, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.patch('/:id/status', async (req, res) => {
    const { status } = req.body;

    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        task.status = status;

        const updatedTask = await task.save();

        res.send(updatedTask);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.patch('/:id/priority', adminAuthorization, async (req, res) => {
    const { priority } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { priority },
            { new: true }
        );
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
