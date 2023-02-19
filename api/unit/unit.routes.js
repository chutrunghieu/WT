const express = require('express');
const auth = require('../../middleware/auth');
const userController = require('./unit.controllers');

const router = express.Router();

router.post('/', auth(['admin', 'manager']), userController.addUnit);
router.put('/:id', auth(['admin', 'manager']), userController.updateUnit);
router.delete('/:id', auth(['admin', 'manager']), userController.deleteUnit);
router.get('/', auth(['admin', 'manager', 'user']), userController.getAllUnit);

module.exports = router;
