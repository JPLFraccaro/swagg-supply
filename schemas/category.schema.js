const joi = require('joi')

const id = joi.string().uuid()
const category = joi.string().min(3).max(15)

const postCategorySchema = joi.object({
  category: category.required()
})

const patchCategorySchema = joi.object({
  category: category
})

const getCategorySchema = joi.object({
  id: id.required(),
})

module.exports = { postCategorySchema, patchCategorySchema, getCategorySchema }
