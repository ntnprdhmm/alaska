'use strict'

const crypto = require('crypto')
const hashHelper = require('../helpers/hash')
const faker = require('faker')

// generate users with known password
const logins = [
  ['antoineprudhomme5@gmail.com', 'yolo'],
  ['yolo@swagg.fr', 'yoloyolo'],
  ['pink@floyd.com', 'yoloyolo']
]
// add random users
for (let i = 0; i < 20; i++) {
  logins.push([faker.internet.email(), faker.internet.password()])
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // create users
    await queryInterface.bulkInsert('Users', logins.map((login, i) => {
      const d = new Date()
      const salt = crypto.randomBytes(128).toString('hex')
      return {
        email: login[0],
        password: hashHelper.hashSync(login[1], salt),
        createdAt: d,
        updatedAt: d,
        salt,
        verificationToken: crypto.randomBytes(128).toString('hex'),
        active: 1
      }
    }))

    const users = await queryInterface.sequelize.query(
      `SELECT id from Users;`
    )
    const usersRows = users[0]

    // create many submissions per user
    let submissions = []
    for (let i = 0; i < usersRows.length; i++) {
      for (let j = 0; j < 6; j++) {
        const d = new Date()
        submissions.push({
          value: 'novalue',
          remoteAddress: faker.internet.ip(),
          stage: Math.random() > 0.5 ? 1 : 2,
          missRate: parseInt(Math.random() * 100),
          falseAlarmRate: parseInt(Math.random() * 100),
          errorRate: parseInt(Math.random() * 100),
          UserId: usersRows[i].id,
          createdAt: d,
          updatedAt: d
        })
      }
    }
    return queryInterface.bulkInsert('Submissions', submissions)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
