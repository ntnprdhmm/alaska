require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// register api routes
const routes = require('./config/routes')
routes(app)

// run server
app.listen(
  process.env.PORT,
  console.log(`Server listening on port ${process.env.PORT}`)
)

module.exports = app
