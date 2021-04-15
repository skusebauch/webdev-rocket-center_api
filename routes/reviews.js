const express = require('express')
const { getReviews, getReview, addReview } = require('../controllers/reviews')

const Review = require('../models/Review')

// merge params from bootcamp
const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

// prefix is always /:bootcampId/courses (defined in bootcamp routes)
router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview)

router.route('/:id').get(getReview)

module.exports = router
