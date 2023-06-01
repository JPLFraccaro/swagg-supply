const express = require('express')
const OrdersService = require('../services/orders.service')
const { validatorHandler } = require('../middlewares/validator.handler')
const { postOrderSchema, patchOrderSchema, getOrderSchema } = require('../schemas/order.schema')
const router = express.Router()
const service = new OrdersService()

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find()
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req,res, next) => {
  try {
    const { id } = req.params
    const order = await service.findOne(id)
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(postOrderSchema, 'body'),

  async (req,res, next) => {
  try {
    const body = req.body
    const newOrder = await service.create(body)
    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(patchOrderSchema, 'body'),
  async (req,res, next) => {
  try {
    const body = req.body
    const { id } = req.params
    const patchedOrder = await service.update(id, body)
    res.status(200).json(patchedOrder)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req,res, next) => {
  try {
    const { id } = req.params
    const deletedOrder = await service.delete(id)
    res.status(202).json(deletedOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
