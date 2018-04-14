const jwt = require('jsonwebtoken')

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      (err || !decodedToken)
        ? reject(err)
        : resolve(decodedToken)
    })
  })
}

const create = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: process.env.JWT_DURATION
    }
  )
}

module.exports = { verify, create }
