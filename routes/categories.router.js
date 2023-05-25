const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categories.service')
const service = new CategoriesService()

router.get('/', (req, res) => {
  const categories = service.find()
  res.status(200).json(categories)
});

router.get('/:id', (req,res) => {
  const { id } = req.params
  const category = service.findOne(id)
  res.status(200).json(category)
})

router.post('/', (req,res) => {
  const body = req.body
  const newCategory = service.create(body)
  res.status(201).json(newCategory)
})

router.patch('/:id', (req,res) => {
  const body = req.body
  const { id } = req.params
  const patchedCategory = service.update(id, body)
  res.status(200).json(patchedCategory)
})

router.delete('/:id', (req,res) => {
  const { id } = req.params
  const deletedCategory = service.delete(id)
  res.status(202).json(deletedCategory)
})
module.exports = router;
