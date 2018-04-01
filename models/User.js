const Sequelize = require('sequelize')
const db = require('../config/db')

const User = db.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email address already in use!'
    },
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  registrationDate: {
    type: Sequelize.DATE
  }
})

module.exports = User
