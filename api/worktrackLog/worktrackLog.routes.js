const express = require('express');
const worktrackLogController = require('./worktrackLog.controller');

const router = express.Router();

router.get('/', worktrackLogController.getAll);
router.get('/:id', worktrackLogController.getById);
router.get('/worktrack/:workTrack_id', worktrackLogController.getAllByWorktrackId);
router.post('/', worktrackLogController.create);
router.put('/:id', worktrackLogController.updateById);
router.delete('/:id', worktrackLogController.deleteById);

module.exports = router;
