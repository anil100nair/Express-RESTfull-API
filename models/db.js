const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const uri = 'mongodb://dbuer:dbpass@ds155674.mlab.com:55674/express-restful-to-do-list';

const db = mongoose.connect(uri, {
    useMongoClient: true
}).then(() => {
    console.log('Connection to database established.');
}).catch(err => {
    console.log('Error in established database connection: ', err);
});

module.exports = db;