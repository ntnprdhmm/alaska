const crypto = require('crypto')

const hash = (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      err
        ? reject(err)
        : resolve(derivedKey.toString('hex'))
    })
  })
}

const hashSync = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}

module.exports = { hash, hashSync }
