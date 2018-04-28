'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Submissions', 'undetected'),
      queryInterface.removeColumn('Submissions', 'accuracy'),
      queryInterface.changeColumn('Submissions', 'falseAlarm', {
        type: Sequelize.DOUBLE
      }),
      queryInterface.addColumn('Submissions', 'miss', Sequelize.DOUBLE, {
        require: true,
        allowNull: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Submissions', 'undetected', Sequelize.INTEGER, {
        require: true,
        allowNull: false
      }),
      queryInterface.addColumn('Submissions', 'accuracy', Sequelize.DOUBLE, {
        require: true,
        allowNull: false
      }),
      queryInterface.changeColumn('Submissions', 'falseAlarm', {
        type: Sequelize.INTEGER
      }),
      queryInterface.removeColumn('Submissions', 'miss')
    ])
  }
}
