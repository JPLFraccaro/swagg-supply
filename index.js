const express = require('express')
const app = express()
const port = 5432

app.get('/', (req,res) => {
  res.send('hello world')
})


app.listen(port, () => {
  console.log('la app esta ejecutandose')
})
