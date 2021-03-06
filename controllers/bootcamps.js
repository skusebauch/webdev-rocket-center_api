const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
const Bootcamp = require('../models/Bootcamp')

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query

  const reqQuery = { ...req.query }
  console.log(req.query)
  // fields to exclude
  const removeFields = ['select', 'sort']

  // loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param])

  let queryStr = JSON.stringify(reqQuery)
  console.log('queryStr', queryStr)
  // averageCost[gte]=10000 or careers[in]=Business
  // https://mongoosejs.com/docs/tutorials/query_casting.html
  // create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  // query string = /api/v1/bootcamps?location.city=Lowell&careers[in]=UI/UX
  // ****queryString {"location.city":"Lowell","careers":{"$in":"UI/UX"}}
  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr))

  // Select Fields - docs: https://mongoosejs.com/docs/queries.html
  if (req.query.select) {
    // turn value of query params select in an array delimiter ","
    // and transform back to string with space due to mongoose docs
    const fields = req.query.select.split(',').join(' ')

    query = query.select(fields)
  }
  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  const bootcamps = await query

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})

// @desc     Get single bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  })
})

// @desc     Create new bootcamp
// @route    POST /api/v1/bootcamps
// @access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ success: true, data: bootcamp })
})

// @desc     Update a bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  })
})

// @desc     Delete a bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc     Get bootcamps within a radius
// @route    GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
// @access   Public
exports.getBoocampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance, unit } = req.params

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calc radius using radius
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 mi or 6,378
  let radius
  unit === 'kilometers'
    ? (radius = distance / 6378)
    : unit === 'miles'
    ? (radius = distance / 3963)
    : 'force error! - must be kilometers or miles'

  // https://docs.mongodb.com/manual/reference/operator/query/centerSphere/
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})
