const joi = require('joi')

const id = joi.string().uuid()
const orderDescription = joi.array().items(joi.object({
  productID: joi.string().uuid(),
  units: joi.number().integer().min(1).max(10),
  price: joi.number().integer().min(10)
}))
const userID = joi.string().uuid()
const paid = joi.bool()
const delivered = joi.bool()
const address = joi.string()

const postOrderSchema = joi.object({
  orderDescription: orderDescription.required(),
  userID: userID.required(),
  paid: paid.required(),
  delivered: delivered.required(),
  address: address.required()
})

const patchOrderSchema = joi.object({
  orderDescription: orderDescription,
  userID: userID,
  paid: paid,
  delivered: delivered,
  address: address
})

const getOrderSchema = joi.object({
  id: id.required(),
})

module.exports = { postOrderSchema, patchOrderSchema, getOrderSchema }
