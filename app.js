// Importing Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const tasks = require('./routes/tasks');
const index = require('./routes/index');

const PORT = process.env.PORT;

const app = express();

// View Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/users/:userId/tasks', (req, res, next) => {
    req.userId = req.params.userId;
    next();
}, tasks);

const db = require('./models/db')
    .then(() => {
        app.listen(PORT, () => {
            console.log('Listening on port: ' + PORT);
        });
    })
    .catch(err => {
        console.log('Error: ', err);
    });
// Or is it better to use
// const http = require('http');
// const server = http.createServer();
// server.listen(PORT);