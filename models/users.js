const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users_schema = new Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    }
});

const users_model = mongoose.model('users', users_schema);

modeule.exports = users_model;