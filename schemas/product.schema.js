const joi = require('joi')

const id = joi.string().uuid()
const name = joi.string().min(3).max(30)
const price = joi.number().integer().min(10)
const details = joi.string().min(1).max(150)
const image = joi.string().uri()
const blockedImage = joi.bool()

const postProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  details: details.required(),
  image: image.required(),
  blockedImage: blockedImage.required()
})

const patchProductSchema = joi.object({
  name: name,
  price: price,
  details: details,
  image: image,
  blockedImage: blockedImage
})

const getProductSchema = joi.object({
  id: id.required(),
})

module.exports = { postProductSchema, patchProductSchema, getProductSchema }
