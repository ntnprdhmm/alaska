'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Submissions', 'undetected', Sequelize.INTEGER, {
        require: true,
        allowNull: false
      }),
      queryInterface.addColumn('Submissions', 'falseAlarm', Sequelize.INTEGER, {
        require: true,
        allowNull: false
      }),
      queryInterface.addColumn('Submissions', 'accuracy', Sequelize.DOUBLE, {
        require: true,
        allowNull: false
      }),
      queryInterface.addColumn('Submissions', 'errorRate', Sequelize.DOUBLE, {
        require: true,
        allowNull: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'undetected'),
      queryInterface.removeColumn('Users', 'falseAlarm'),
      queryInterface.removeColumn('Users', 'accuracy'),
      queryInterface.removeColumn('Users', 'errorRate')
    ])
  }
}
