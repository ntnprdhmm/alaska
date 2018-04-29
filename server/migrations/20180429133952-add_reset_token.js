'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'resetToken', Sequelize.STRING(256))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'resetToken')
  }
}
