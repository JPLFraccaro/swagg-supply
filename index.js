const express = require('express')
const app = express()
const routerAPI = require('./routes/index')
const port = 5432

app.use(express.json())
app.listen(port, () => {
  console.log('la app esta ejecutandose')
})

app.get('/', (req,res) => {
  res.send('hello world')
})

routerAPI(app)
