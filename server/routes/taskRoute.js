const express = require('express');
const Task = require('../models/taskModel');
const { authorization, adminAuthorization } = require('../middlewares/auth'); 
const router = express.Router();
const User = require('../models/usersModel');


router.post('/create', async (req, res) => {
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
        res.status(201).send({message: 'Task created successfully'});
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({ createdAt: -1 }).populate('userId', '-password');
        res.send(tasks);
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

router.post('/mytasks', async (req, res) => {
    const { username } = req.body;
    console.log(username);

    try {
        const user = await User.findOne({ username });
        // console.log(user);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const tasks = await Task.find({ userId: user._id }).sort({ createdAt: -1 }).populate('userId', '-password');
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});



router.put('/:id', async (req, res) => {
    const { title, description, dueDate,status, priority, userId } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, status, priority, userId },
            { new: true }
        );
        console.log(task)

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
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
