const express = require('express');
const auth = require('../../middleware/auth');
const kpiNormController = require('./kpiNorm.controller');

const router = express.Router();

router.post('/', auth(['admin', 'manager']), kpiNormController.addKpiNorm);
router.get('/', auth(['admin', 'manager', 'user']), kpiNormController.getAllKpiNorm);
router.get('/:id', auth(['admin', 'manager', 'user']), kpiNormController.getKpiNormDetail);
router.put('/:id', auth(['admin', 'manager']), kpiNormController.updateKpiNorm);
router.delete('/:id', auth('admin'), kpiNormController.deleteKpiNorm);

module.exports = router;
