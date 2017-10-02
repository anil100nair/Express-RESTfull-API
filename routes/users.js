const express = require('express');
const router = express.Router();
const db = require('../models/db');
const userApi = require('../controllers/users');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/users', userApi.createUser);

router.get('/users', userApi.findAllUsers);

router.get('/users/:id', userApi.findOneUser);

router.put('/users/:id', userApi.editUser);

router.delete('/users/:id', userApi.deleteUser);

module.exports = router;