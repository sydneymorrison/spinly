const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');


//POST /vinyls/:id/reviews (create a review for a post 1:M)
router.post('/vinyls/:id/reviews', ensureLoggedIn, reviewsController.create);

// DELETE /reviews
router.delete('/reviews/:id', ensureLoggedIn, reviewsController.delete);

module.exports = router;


