// Importing Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/users');

const PORT = process.env.PORT;

const app = express();

// View Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(PORT, () => {
    console.log('Listening on Port: '+ PORT);
});
// Or is it better to use
// const http = require('http');
// const server = http.createServer();
// server.listen(PORT);