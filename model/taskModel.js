const mongoose = require('mongoose')

// model schema
const taskModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    sub: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{
    collection: 'tasks',
    timestamps: true
});

module.exports = mongoose.model("Task", taskModel)
