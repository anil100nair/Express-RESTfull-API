const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;