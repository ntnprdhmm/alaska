'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Users', 'salt', {
      type: Sequelize.STRING(256)
    })
    queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING(128)
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Users', 'salt', {
      type: Sequelize.STRING
    })
    queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING
    })
  }
}
