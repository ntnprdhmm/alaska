const User = require('../models/User')

const register = (req, res) => {
  User.create(req.body)
    .then(user => {
      console.log("------SUCCESS")
      res.json(user)
    })
    .catch(err => {
      return (err.name === 'SequelizeValidationError')
        ? res.status(400).json(err)
        : res.status(500).json(err)
    })
}

module.exports = { register }
