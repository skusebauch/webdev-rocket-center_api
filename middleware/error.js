const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // Log to console for dev
  console.log('****', err)

  // Mongoose bad object id
  if (err.name === 'CastError') {
    const message = `Resource not found`
    // here we set the error message and statusCode
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicated field value entered - ${err.keyValue.name}`
    // here we set the error message and statusCode
    error = new ErrorResponse(message, 400)
  }

  // Mongoose validation required fields
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    // here we set the error message and statusCode
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  })
}

module.exports = errorHandler
