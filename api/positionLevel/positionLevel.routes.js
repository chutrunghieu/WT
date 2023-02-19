const express = require('express');
const positionLevelController = require('./positionLevel.controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth('admin'), positionLevelController.getAll);
router.get('/:id', auth('admin'), positionLevelController.getById);
router.post('/', auth('admin'), positionLevelController.create);
router.put('/:id', auth('admin'), positionLevelController.updateById);
router.delete('/:id', auth('admin'), positionLevelController.deleteById);

module.exports = router;
