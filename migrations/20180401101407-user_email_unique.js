'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'custom_unique_constraint_name'
    })
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Users', 'custom_unique_constraint_name')
  }
}
