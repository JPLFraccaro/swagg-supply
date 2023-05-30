const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service')
const service = new UsersService()

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req,res, next) => {
  try {
    const { id } = req.params
    const user = await service.findOne(id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req,res, next) => {
  try {
    const body = req.body
    const newUser = await service.create(body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req,res, next) => {
  try {
    const body = req.body
    const { id } = req.params
    const patchedUser = await service.update(id, body)
    res.status(200).json(patchedUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req,res, next) => {
  try {
    const { id } = req.params
    const deletedUser = await service.delete(id)
    res.status(202).json(deletedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
