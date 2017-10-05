const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const uri = process.env.MONGOLAB_URL_TODO;

const db = mongoose.connect(uri, {
    useMongoClient: true
}).then(() => {
    console.log('Connection to database established.');
}).catch(err => {
    console.log('Error in established database connection: ', err);
});

module.exports = db;