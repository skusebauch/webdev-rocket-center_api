const express = require('express')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps')

const router = express.Router()

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
