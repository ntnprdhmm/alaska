'use strict'

const models = require('../models/index')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      models.User.tableName,
      models.User.attributes
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
}
