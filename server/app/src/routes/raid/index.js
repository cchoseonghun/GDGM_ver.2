'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./raid.ctrl');

router.get('/', ctrl.output.list);
router.post('/', ctrl.process.create);
router.delete('/', ctrl.process.delete);

router.post('/members', ctrl.process.addMembers);
router.patch('/members/state', ctrl.process.updateMemberState);


module.exports = router;