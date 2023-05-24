const express = require('express')
const router = express.Router()
const { faker } = require('@faker-js/faker')

router.get('/', (req,res) => {
  const products = []
  const { size } = req.query
  const limit = size || 10
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      details: faker.commerce.productDescription(),
      image: faker.image.url(),
      price: parseInt(faker.commerce.price(), 10)
    })
  }
  res.status(200).json(products)
})

router.get('/:id', (req,res) => {
  const { id } = req.params
  if (id==='999'){
    res.status(404).json({
      message:"not found"
    })
  }
  else {
    res.status(200).json(
      {
        id,
        name : "Zapatillas",
        details: "Zapatillas unisex y unitalla",
        cents : 900
      }
    )
  }
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
