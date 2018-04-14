'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'active', Sequelize.BOOLEAN)
    queryInterface.addColumn('Users', 'verificationToken', Sequelize.STRING(256))
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'active')
    queryInterface.removeColumn('Users', 'verificationToken')
  }
}
