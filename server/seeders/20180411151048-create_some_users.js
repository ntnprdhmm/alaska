'use strict'

const crypto = require('crypto')
const hashHelper = require('../helpers/hash')

const passwords = [
  'yolo123',
  'azerty789'
]
const salts = [
  crypto.randomBytes(128).toString('hex'),
  crypto.randomBytes(128).toString('hex')
]
const verificationTokens = [
  crypto.randomBytes(128).toString('hex'),
  crypto.randomBytes(128).toString('hex')
]

const hashPasswords = (passwords, salts) => {
  return Promise.all([
    hashHelper.hash(passwords[0], salts[0]),
    hashHelper.hash(passwords[1], salts[1])
  ])
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    // create 2 users
    return hashPasswords(passwords, salts)
    .then(hashedPasswords => {
      return queryInterface.bulkInsert('Users', [
        {
          email: 'antoineprudhomme5',
          password: hashedPasswords[0],
          createdAt: new Date(),
          updatedAt: new Date(),
          salt: salts[0],
          verificationToken: verificationTokens[0],
          active: 1
        },
        {
          email: 'foo.bar@utt.fr',
          password: hashedPasswords[1],
          createdAt: new Date(),
          updatedAt: new Date(),
          salt: salts[1],
          verificationToken: verificationTokens[1],
          active: 0
        }
      ], {})
        .then(idFirst => {
          // add some submissions to the first user
          return queryInterface.bulkInsert('Submissions', [
            {
              value: 'img_003;img_002;img_001',
              remoteAddress: '164.230.10.2',
              UserId: idFirst,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              value: 'img_002;img_003;img_001',
              remoteAddress: '164.230.10.2',
              UserId: idFirst,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ], {})
        })
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Users', null, {}),
      queryInterface.bulkDelete('Submissions', null, {})
    ])
  }
}
