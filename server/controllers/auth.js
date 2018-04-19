const crypto = require('crypto')
const models = require('../models/index')
const hashHelper = require('../helpers/hash')
const jwtHelper = require('../helpers/jwt')
const mailHelper = require('../helpers/mail')

const register = (req, res) => {
  // check if there is an email in the request's body
  if (!req.body.email) return res.status(400).json({
    message: 'you must provide an email address'
  })
  // check if there is a password in the request's body
  if (!req.body.password) return res.status(400).json({
    message: 'you must provide a password'
  })
  // generate salt
  const salt = crypto.randomBytes(128).toString('hex')
  // hash the password, using the generated salt
  hashHelper.hash(req.body.password, salt)
    .then(password => {
      // update request body with new fields
      const data = Object.assign({}, req.body, {
        salt,
        password,
        active: false,
        verificationToken: crypto.randomBytes(128).toString('hex')
      })
      // create the new user
      models.User.create(data)
        .then(user => {
          // send verification mail
          mailHelper.send(
            `Alaska <${process.env.EMAIL_SENDER}>`,
            user.email,
            `email confirmation`,
            `${process.env.SERVER_ROOT}?token=${user.verificationToken}`
          )
            .then(_ => res.json({ message: 'account create. check your emails to validate your account !' }))
            .catch(_ => res.status(500).json({message: 'server error'}))
        })
        .catch(err => {
          return (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError')
            ? res.status(400).json({ message: 'wrong email address' })
            : res.status(500).json({ message: 'server error' })
        })
    })
    .catch(_ => res.status(500).json({ message: 'server error' }))
}

const callback = (req, res) => {
  // search the user with this token
  models.User.findOne({where: {verificationToken: req.body.token}})
    .then(user => {
      // if he doesn't exists, return error
      if (!user) return res.status(401).json({ message: 'invalid validation token' })
      // We found him. Let's activate his account
      user.active = true
      user.save()
        .then(_ => res.status(200).json({ message: 'account validated ! now, you can log in' }))
        .catch(_ => res.status(500).json({ message: 'server error' }))
    })
    .catch(_ => res.status(500).json({ message: 'server error' }))
}

const login = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'missing email address' })
  }
  // find the user using the email in the request's body
  models.User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) return res.status(404).json({ message: 'wrong email address' })
      // hash the password in the request's body
      hashHelper.hash(req.body.password, user.salt)
        .then(hash => {
          // compare it to the hash stored in database
          if (hash !== user.password) {
            return res.status(401).json({ message: 'wrong password' })
          }
          // check if his account is activated
          if (!user.active) {
            return res.status(401).json({ message: 'You have to activate your account. Check your emails.' })
          }
          // create JWT
          const token = jwtHelper.create({
            email: user.email
          })
          return res.json({ token, message: 'login successful !' })
        })
    })
    .catch(err => res.status(500).json({ message: 'server error' }))
}

module.exports = { register, callback, login }
