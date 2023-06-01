const express = require('express');
const CategoriesService = require('../services/categories.service')
const { validatorHandler } = require('../middlewares/validator.handler')
const { postCategorySchema, patchCategorySchema, getCategorySchema } = require('../schemas/category.schema')

const router = express.Router();
const service = new CategoriesService()

router.get('/', async (req,res,next) => {
  try {
    const categories = await service.find()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req,res,next) => {
  try {
    const { id } = req.params
    const category = await service.findOne(id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(postCategorySchema, 'body'),
  async (req,res,next) => {
  try {
    const body = req.body
    const newCategory = await service.create(body)
    res.status(201).json(newCategory)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(patchCategorySchema, 'body'),
  async (req,res,next) => {
  try {
    const body = req.body
    const { id } = req.params
    const patchedCategory = await service.update(id, body)
    res.status(200).json(patchedCategory)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req,res,next) => {
  try {
    const { id } = req.params
    const deletedCategory = await service.delete(id)
    res.status(202).json(deletedCategory)
  } catch (error) {
    next(error)
  }
})

module.exports = router
