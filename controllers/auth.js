const crypto = require('crypto')
const models = require('../models/index')
const hashHelper = require('../helpers/hash')

const register = (req, res) => {
  const salt = crypto.randomBytes(128)
  hashHelper.hash(req.body.password, salt)
    .then(password => {
      const data = Object.assign({}, req.body, {salt, password})

      models.User.create(data)
        .then(user => res.status(201).json(user))
        .catch(err => {
          return (err.name === 'SequelizeValidationError')
            ? res.status(400).json(err)
            : res.status(500).json(err)
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

module.exports = { register }
