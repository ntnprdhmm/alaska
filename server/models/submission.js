'use strict'

module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    value: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false
    },
    remoteAddress: {
      type: DataTypes.STRING,
      require: true,
      allowNull: false
    },
    stage: {
      type: DataTypes.ENUM,
      values: [1, 2]
    },
    miss: {
      type: DataTypes.DOUBLE,
      require: true,
      allowNull: false
    },
    falseAlarm: {
      type: DataTypes.DOUBLE,
      require: true,
      allowNull: false
    },
    errorRate: {
      type: DataTypes.DOUBLE,
      require: true,
      allowNull: false
    }
  })

  Submission.associate = (models) => {
    Submission.belongsTo(models.User)
  }

  return Submission
}
