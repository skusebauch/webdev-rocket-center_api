const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: 'Show all bootcamps - still wait for db' })
})

router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id} - still wait for db`,
  })
})

router.post('/', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: 'Create new Bootcamp - still wait for db' })
})

router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id} - still wait for db`,
  })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id} - still wait for db`,
  })
})

module.exports = router
