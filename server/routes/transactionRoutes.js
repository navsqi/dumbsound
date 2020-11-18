const express = require('express');

const router = express.Router();

const transactionController = require('../controllers/transactionController');
const { protect, allowTo } = require('../controllers/authController');
const { uploadSingle } = require('../utils/uploadImage');

router
  .route('/')
  .get(protect, transactionController.getTransactions)
  .post(
    protect,
    uploadSingle('transaction', 'attachment'),
    transactionController.createTransaction
  );

router.route('/expires/update').patch(transactionController.checkExpired);

router
  .route('/:id')
  .patch(protect, allowTo('admin'), transactionController.updateTransaction)
  .delete(protect, allowTo('admin'), transactionController.deleteTransaction);

module.exports = router;
