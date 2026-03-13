const express = require('express');
const router = express.Router();
const {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} = require('../controllers/listingsController');

router.route('/').get(getListings).post(createListing);
router.route('/:id').get(getListingById).put(updateListing).delete(deleteListing);

module.exports = router;
