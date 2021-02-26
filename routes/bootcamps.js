const express = require('express')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBoocampsInRadius,
} = require('../controllers/bootcamps')

const router = express.Router()

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
