'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Submissions', 'miss', 'missRate'),
      queryInterface.renameColumn('Submissions', 'falseAlarm', 'falseAlarmRate')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Submissions', 'missRate', 'miss'),
      queryInterface.renameColumn('Submissions', 'falseAlarmRate', 'falseAlarm')
    ])
  }
}
