const jwtHelper = require('../helpers/jwt')
const models = require('../models/index')

const authMiddleware = (req, res, next) => {
  // exclude the following routes
  if (req.path === '/auth/login' ||
      req.path === '/auth/register/callback' ||
      req.path === '/auth/register/email' ||
      req.path === '/auth/reset' ||
      req.path === '/stage' ||
      req.path === '/auth/reset/callback' ||
      (req.path === '/submission' && req.method === 'GET') ||
      req.path === '/auth/register') {
    return next()
  }

  // parse the authorisation header, to get the JWT
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null

  // verify the token
  jwtHelper.verify(token)
    .then(payload => {
      req.payload = payload
      // fetch the User
      return models.User.findOne({where: {email: payload.email}})
    })
    .then(user => {
      req.user = user
      return next()
    })
    .catch(err => res.status(401).json(err))
}

module.exports = authMiddleware
