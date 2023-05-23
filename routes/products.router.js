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
  res.json(products)
})

router.get('/:id', (req,res) => {
  const { id } = req.params
  res.json(
    {
      id,
      name : "Zapatillas",
      details: "Zapatillas unisex y unitalla",
      cents : 900
    }
  )
})

module.exports = router
