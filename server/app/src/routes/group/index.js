'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./group.ctrl');

router.get('/list', ctrl.output.list);
router.get('/code', ctrl.output.code);

router.post('/', ctrl.process.create);

module.exports = router;

