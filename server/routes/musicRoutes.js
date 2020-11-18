const express = require('express');

const router = express.Router();

const musicController = require('../controllers/musicController');
const { protect, allowTo } = require('../controllers/authController');
const { uploadSingle } = require('../utils/uploadImage');

router
  .route('/')
  .get(musicController.getMusics)
  .post(protect, allowTo('admin'), uploadSingle('music', 'thumbnail'), musicController.createMusic);

router
  .route('/:id')
  .get(musicController.getMusic)
  .patch(protect, allowTo('admin'), musicController.updateMusic)
  .delete(protect, allowTo('admin'), musicController.deleteMusic);

module.exports = router;
