const models = require('../models/index')

const register = (req, res) => {
  models.User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => {
      return (err.name === 'SequelizeValidationError')
        ? res.status(400).json(err)
        : res.status(500).json(err)
    })
}

module.exports = { register }
