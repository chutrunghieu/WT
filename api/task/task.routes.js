const express = require('express');
const auth = require('../../middleware/auth');
const taskController = require('./task.controllers');

const router = express.Router();

router.post('/', auth(['admin', 'manager']), taskController.addTask);
router.get('/', auth(['admin', 'manager']), taskController.getTask);
router.get('/:id', auth(['admin', 'manager']), taskController.getTaskDetail);
router.get('/getTaskByUser', auth(['admin', 'manager', 'user']), taskController.getTaskByUser);
router.put('/:id', auth(['admin', 'manager']), taskController.updateTask);
router.delete('/', auth(['admin', 'manager']), taskController.deleteTask);

module.exports = router;
