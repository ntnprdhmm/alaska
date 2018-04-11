'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Submissions', 'value', {
      type: Sequelize.TEXT,
      allowNull: false,
      required: true
    })
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Submissions', 'value', {
      type: Sequelize.TEXT,
      allowNull: true,
      required: false
    })
  }
}
