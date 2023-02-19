const express = require('express');
const auth = require('../../middleware/auth');
const positionController = require('./position.controller');

const router = express.Router();

router.get('/', auth(['admin', 'manager']), positionController.getAllPosition);
router.get('/:id', auth(['admin', 'manager']), positionController.getPositionDetail);
router.post('/', auth(['admin', 'manager']), positionController.addPosition);
router.put('/:id', auth(['admin', 'manager']), positionController.updatePosition);
router.delete('/:id', auth(['admin', 'manager']), positionController.deletePosition);

module.exports = router;
