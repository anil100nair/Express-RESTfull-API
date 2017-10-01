var mongoose = require('mongoose');

var tasks_schema = mongoose.Schema({
    task: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        require: true
    }
});

var users_model = mongoose.model('tasks', tasks_schema);

modeule.exports = tasks_model;