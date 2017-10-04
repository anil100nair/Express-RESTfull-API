const express = require('express');
const router = express.Router();
const db = require('../models/db');
const userApi = require('../controllers/users');

router.post('/', userApi.createUser);

router.get('/', userApi.findAllUsers);

router.get('/:userId', userApi.findOneUser);

router.put('/:userId', userApi.editUser);

router.delete('/:userId', userApi.deleteUser);

module.exports = router;