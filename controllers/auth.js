const crypto = require('crypto')
const models = require('../models/index')
const hashHelper = require('../helpers/hash')

const register = (req, res) => {
  // check if there is a password in the request's body
  if (!req.body.password) return res.status(400).json()
  // generate salt
  const salt = crypto.randomBytes(128).toString('hex')
  // hash the password, using the generated salt
  hashHelper.hash(req.body.password, salt)
    .then(password => {
      // put salt and update the password in the request's body
      const data = Object.assign({}, req.body, {salt, password})
      // create the new user
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

const login = (req, res) => {
  // find the user using the email in the request's body
  models.User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) return res.status(404).json()
      // hash the password in the request's body
      hashHelper.hash(req.body.password, user.salt)
        .then(hash => {
          // compare it to the hash stored in database
          if (hash !== user.password) return res.status(400).json()
          return res.json(hash)
        })
    })
    .catch(err => res.status(500).json(err))
}

module.exports = { register, login }
