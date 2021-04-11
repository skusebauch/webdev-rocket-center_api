const express = require('express')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBoocampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp')

const advancedResults = require('../middleware/advancedResults')

// Include other ressource routers
const courseRouter = require('./courses')

const router = express.Router()

const { protect } = require('../middleware/auth')

// Reroute into other resource routers if first argument is hit - add mergeParams true to course router
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance/:unit').get(getBoocampsInRadius)

router.route('/:id/photo').put(protect, bootcampPhotoUpload)

// prettier-ignore
router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp)

// prettier-ignore
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)

module.exports = router
