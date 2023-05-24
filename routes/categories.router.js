const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
  res.status(200).json ({
    id:"none"
  })
})

router.get('/:id', (req,res) => {
  const { id } = req.params
  res.status(200).json (
    {
      id
    } )
})

router.post('/', (req,res) => {
  const body = req.body
  res.status(201).json({
    message: 'created',
    data: body
  })
})

router.patch('/:id', (req,res) => {
  const body = req.body
  const { id } = req.params
  res.status(200).json({
    id,
    message: 'partial update',
    data: body
  })
})

router.delete('/:id', (req,res) => {
  const { id } = req.params
  res.status(202).json({
    id,
    message: 'deleted',
  })
})

module.exports = router
