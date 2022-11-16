'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./raid.ctrl');

router.post('/', ctrl.process.create);

module.exports = router;