'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'active', Sequelize.BOOLEAN),
      queryInterface.addColumn('Users', 'verificationToken', Sequelize.STRING(256))
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'active'),
      queryInterface.removeColumn('Users', 'verificationToken')
    ])
  }
}
