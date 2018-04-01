require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const db = require('./config/db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// register api routes
const routes = require('./config/routes')
routes(app)

// test database connection
db.authenticate()
  .then(() => {
    console.log('Connection to database successfully established.')
    // run server
    app.listen(
      process.env.PORT,
      console.log(`Server listening on port ${process.env.PORT}`)
    )
  })
  .catch(err => console.error('Unable to connect to the database:', err))
