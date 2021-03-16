const express = require('express')
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses')

// merge params from bootcamp
const router = express.Router({ mergeParams: true })

// prefix is always /:bootcampId/courses (defined in bootcamp routes)
router.route('/').get(getCourses).post(addCourse)

router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse)

module.exports = router
