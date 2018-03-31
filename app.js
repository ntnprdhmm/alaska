require('dotenv').config()

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello world !')
})

// run server
app.listen(
  process.env.PORT,
  console.log(`server listening on port ${process.env.PORT}`)
)
