const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service')
const service = new UsersService()

router.get('/', async (req, res) => {
  try {
    const users = await service.find()
    res.status(200).json(users)
  } catch (error) {
      res.status(404).json({
        message: error.message
      })
  }
})

router.get('/:id', async (req,res) => {
  try {
    const { id } = req.params
    const user = await service.findOne(id)
    res.status(200).json(user)
  } catch (error) {
      res.status(404).json({
        message: error.message
      })
  }
})

router.post('/', async (req,res) => {
  try {
    const body = req.body
    const newUser = await service.create(body)
    res.status(201).json(newUser)
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
    const patchedUser = await service.update(id, body)
    res.status(200).json(patchedUser)
  } catch (error) {
      res.status(404).json({
        message: error.message
      })
  }
})

router.delete('/:id', async (req,res) => {
  try {
    const { id } = req.params
    const deletedUser = await service.delete(id)
    res.status(202).json(deletedUser)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

module.exports = router
