'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Submissions', 'stage', Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Submissions', 'stage')
  }
}
