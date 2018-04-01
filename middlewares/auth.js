const jwtHelper = require('../helpers/jwt')

const authMiddleware = (req, res, next) => {
  // parse the authorisation header, to get the JWT
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null

  // verify the token
  jwtHelper.verify(token)
    .then(payload => {
      req.payload = payload
      return next()
    })
    .catch(err => res.status(401).json(err))
}

module.exports = authMiddleware
