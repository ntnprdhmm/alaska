'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Submissions', 'remoteAddress', Sequelize.STRING, {
      require: true,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Submissions', 'remoteAddress')
  }
}
