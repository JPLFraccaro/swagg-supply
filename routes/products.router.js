const express = require('express')
const router = express.Router()
const ProductsService = require('../services/products.service')
const service = new ProductsService()

router.get('/', (req,res) => {
  const products = service.find()
  res.status(200).json(products)
})

router.get('/:id', (req,res) => {
  const { id } = req.params
  const product = service.findOne(id)
  res.status(200).json(product)
})

router.post('/', (req,res) => {
  const body = req.body
  const newProduct = service.create(body)
  res.status(201).json(newProduct)
})

router.patch('/:id', (req,res) => {
  const body = req.body
  const { id } = req.params
  const patchedProduct = service.update(id, body)
  res.status(200).json(patchedProduct)
})

router.delete('/:id', (req,res) => {
  const { id } = req.params
  const deletedProduct = service.delete(id)
  res.status(202).json(deletedProduct)
})


module.exports = router
