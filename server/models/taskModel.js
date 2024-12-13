const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('task', taskSchema);