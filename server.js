const express = require('express')
const dotenv = require('dotenv')

// load env vars
dotenv.config({ path: './config/config.env' })

const app = express()

app.get('/api/v1/bootcamps', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: 'Show all bootcamps - still wait for db' })
})

app.get('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id} - still wait for db`,
  })
})

app.post('/api/v1/bootcamps', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: 'Create new Bootcamp - still wait for db' })
})

app.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id} - still wait for db`,
  })
})

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id} - still wait for db`,
  })
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
