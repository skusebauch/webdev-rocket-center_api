const express = require('express')
const { getCourses } = require('../controllers/courses')

// merge params from bootcamp
const router = express.Router({ mergeParams: true })

router.route('/').get(getCourses)

module.exports = router
