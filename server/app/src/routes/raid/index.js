'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./raid.ctrl');

router.get('/', ctrl.output.list);
router.post('/', ctrl.process.create);

module.exports = router;