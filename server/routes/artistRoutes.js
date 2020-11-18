const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artistController');
const { protect, allowTo } = require('../controllers/authController');

router
  .route('/')
  .get(artistController.getArtists)
  .post(protect, allowTo('admin'), artistController.createArtist);

router
  .route('/:id')
  .patch(protect, allowTo('admin'), artistController.updateArtist)
  .delete(protect, allowTo('admin'), artistController.deleteArtist);

router.route('/:id/musics').get(artistController.getMusicsByArtist);

module.exports = router;
