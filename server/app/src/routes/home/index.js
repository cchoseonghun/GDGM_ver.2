'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');
router.get('/', ctrl.output.index);

router.post('/login', ctrl.process.login);

module.exports = router;

