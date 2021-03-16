const express = require('express')
const { getCourses, getCourse, addCourse } = require('../controllers/courses')

// merge params from bootcamp
const router = express.Router({ mergeParams: true })

// prefix is always /:bootcampId/courses (defined in bootcamp routes)
router.route('/').get(getCourses).post(addCourse)

router.route('/:id').get(getCourse)

module.exports = router
