const express = require('express')
const app = express()
const { faker } = require('@faker-js/faker')
const port = 5432

app.get('/', (req,res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log('la app esta ejecutandose')
})

app.get('/users', (req, res) => {
  const { limit, offset} = req.query
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('no params')
  }
})

app.get('/products', (req,res) => {
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

app.get('/products/:id', (req,res) => {
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

app.get('/categories/:categoryId/products/:productId', (req,res) => {
  const { categoryId, productId } = req.params
  res.json (
    {
      categoryId,
      productId
    } )
})
