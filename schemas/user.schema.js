const joi = require('joi')

const id = joi.string().uuid()
const name = joi.string().min(3).max(15)
const pass = joi.string().alphanum().min(13).max(13)
const bio = joi.string().min(3).max(150)
const image = joi.string().uri()

const postUserSchema = joi.object({
  name: name.required(),
  pass: pass.required(),
  bio: bio.required(),
  image: image.required()
})

const patchUserSchema = joi.object({
  name: name,
  pass: pass,
  bio: bio,
  image: image
})

const getUserSchema = joi.object({
  id: id.required(),
})

module.exports = { postUserSchema, patchUserSchema, getUserSchema }
