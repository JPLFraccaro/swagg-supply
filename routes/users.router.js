const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.status(200).json({
      limit,
      offset,
    });
  } else {
    res.status(400).send('no params');
  }
});

router.post('/', (req,res) => {
  const body = req.body
  res.status(201).json({
    message: 'created',
    data: body
  })
})

router.patch('/:id', (req,res) => {
  const body = req.body
  const { id } = req.params
  res.status(200).json({
    id,
    message: 'partial update',
    data: body
  })
})

router.delete('/:id', (req,res) => {
  const { id } = req.params
  res.status(202).json({
    id,
    message: 'deleted',
  })
})
module.exports = router;
