const express = require('express');
const auth = require('../../middleware/auth');
const requirementController = require('./requirement.controller');

const router = express.Router();

router.get('/', auth(['admin', 'manager']), requirementController.getAll);
router.get('/:id', auth(['admin', 'manager']), requirementController.getById);
router.post('/', auth(['admin', 'manager']), requirementController.create);
router.put('/:id', auth(['admin', 'manager']), requirementController.updateById);
router.delete('/:id', auth(['admin', 'manager']), requirementController.deleteById);

module.exports = router;
