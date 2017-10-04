const express = require('express');
const router = express.Router();
const db = require('../models/db');
const taskApi = require('../controllers/tasks');

router.post('/', taskApi.createTask);

router.get('/', taskApi.findAllTasks);

router.get('/:taskId', taskApi.findOneTask);

router.put('/:taskId', taskApi.editTask);

router.delete('/:taskId', taskApi.deleteTask);

module.exports = router;