const jwt = require('jsonwebtoken')

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      // check if the token has expired
      if (err && err.name === 'TokenExpiredError') {
        return reject({ message: 'Your token has expired. Please logout and login back.' })
      }
      // check if there is another error
      if (err || !decodedToken) {
        return reject({ message: 'Something happened to your token. Please logout and login back.' })
      } 
      // all is ok, return the token
      resolve(decodedToken)
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
