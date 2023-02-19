const express = require('express');
const auth = require('../../middleware/auth');
const userController = require('./user.controller');

const router = express.Router();

router.post('/', auth('admin'), userController.addUser);
router.get('/', auth(['admin', 'user', 'manager']), userController.getAllUser);
router.get('/exportExcel', auth(['admin', 'manager']), userController.exportExcel);
router.put('/changePassword', auth(['admin', 'user', 'manager']), userController.changePassword);
router.put('/me', auth(['admin', 'user', 'manager']), userController.updateInformation);
router.get('/:id', auth(['admin', 'user', 'manager']), userController.getUserDetail);
router.put('/:id', auth('admin'), userController.updateProfile);
router.get('/department/:department_id', auth(['admin', 'user', 'manager']), userController.getAllUserByDepartmentId);
// router.delete('/', auth('admin'), userController.deleteUser);

module.exports = router;
