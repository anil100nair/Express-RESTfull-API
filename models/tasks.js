const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasks_schema = new Schema({
    task: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        require: true
    }
});

const tasks_model = mongoose.model('tasks', tasks_schema);

modeule.exports = tasks_model;