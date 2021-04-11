const advancedResults = (model, populate) => async (req, res, next) => {
  let query

  const reqQuery = { ...req.query }

  // fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit']

  // loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param])

  let queryStr = JSON.stringify(reqQuery)

  // averageCost[gte]=10000 or careers[in]=Business
  // https://mongoosejs.com/docs/tutorials/query_casting.html
  // create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  // query string = /api/v1/bootcamps?location.city=Lowell&careers[in]=UI/UX
  // ****queryString {"location.city":"Lowell","careers":{"$in":"UI/UX"}}
  // Finding resource
  query = model.find(JSON.parse(queryStr))

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

  // pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()

  query = query.skip(skip).limit(limit)

  if (populate) {
    query = query.populate(populate)
  }

  // Executing query
  const results = await query

  // pagination result
  const pagination = {}
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  }

  next()
}

module.exports = advancedResults
