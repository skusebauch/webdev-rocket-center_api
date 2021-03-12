const express = require('express')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBoocampsInRadius,
} = require('../controllers/bootcamps')

// Include other ressource routers
const courseRouter = require('./courses')

const router = express.Router()

// Reroute into other resource routers if first argument is hit - add mergeParams true to course router
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance/:unit').get(getBoocampsInRadius)

// prettier-ignore
router.route('/')
  .get(getBootcamps)
  .post(createBootcamp)

// prettier-ignore
router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)

module.exports = router
