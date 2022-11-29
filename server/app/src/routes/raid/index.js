'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./raid.ctrl');

router.get('/', ctrl.output.list);

router.post('/', ctrl.process.create);

router.patch('/members', ctrl.process.update);

router.delete('/', ctrl.process.delete);

module.exports = router;