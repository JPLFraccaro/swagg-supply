const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service')
const service = new UsersService()

router.get('/', (req, res) => {
  const users = service.find()
  res.status(200).json(users)
});

router.get('/:id', (req,res) => {
  const { id } = req.params
  const user = service.findOne(id)
  res.status(200).json(user)
})

router.post('/', (req,res) => {
  const body = req.body
  const newUser = service.create(body)
  res.status(201).json(newUser)
})

router.patch('/:id', (req,res) => {
  const body = req.body
  const { id } = req.params
  const patchedUser = service.update(id, body)
  res.status(200).json(patchedUser)
})

router.delete('/:id', (req,res) => {
  const { id } = req.params
  const deletedUser = service.delete(id)
  res.status(202).json(deletedUser)
})
module.exports = router;
