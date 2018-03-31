require('dotenv').config()

const express = require('express')
const app = express()

const db = require('./config/db')

app.get('/', (req, res) => {
  res.send('hello world !')
})

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
