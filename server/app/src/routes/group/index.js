'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./group.ctrl');

router.get('/list', ctrl.output.list);

router.post('/', ctrl.process.create);

module.exports = router;

