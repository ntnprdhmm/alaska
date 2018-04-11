'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Submissions', 'remoteAddress', Sequelize.STRING, {
      require: true,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Submissions', 'remoteAddress')
  }
}
