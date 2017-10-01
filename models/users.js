var mongoose = require('mongoose');

var users_schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    }
});

var users_model = mongoose.model('users', users_schema);

modeule.exports = users_model;