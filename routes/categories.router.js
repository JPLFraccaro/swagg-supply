const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categories.service')
const service = new CategoriesService()

router.get('/', async (req,res) => {
  try {
    const categories = await service.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(404).json({
      message: error
    })
  }
})

router.get('/:id', async (req,res) => {
  try {
    const { id } = req.params
    const category = await service.findOne(id)
    res.status(200).json(category)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/', async (req,res) => {
  try {
    const body = req.body
    const newCategory = await service.create(body)
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.patch('/:id', async (req,res) => {
  try {
    const body = req.body
    const { id } = req.params
    const patchedCategory = await service.update(id, body)
    res.status(200).json(patchedCategory)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.delete('/:id', async (req,res) => {
  try {
    const { id } = req.params
    const deletedCategory = await service.delete(id)
    res.status(202).json(deletedCategory)
  } catch (error) {
   res.status(404).json({
    message: error.message
   })
  }
})
module.exports = router;
