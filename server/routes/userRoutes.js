const express = require('express');

const router = express.Router();

const userController = require('../controllers/userControllers');
const { protect, allowTo } = require('../controllers/authController');

router.route('/').get(protect, allowTo('admin'), userController.getUsers);

router.route('/:id').delete(protect, allowTo('admin'), userController.deleteUser);

module.exports = router;
