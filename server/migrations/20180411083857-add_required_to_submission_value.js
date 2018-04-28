'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Submissions', 'value', {
      type: Sequelize.TEXT,
      allowNull: false,
      required: true
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Submissions', 'value', {
      type: Sequelize.TEXT,
      allowNull: true,
      required: false
    })
  }
}
