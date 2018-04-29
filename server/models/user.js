'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    verificationToken: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    resetToken: {
      type: DataTypes.STRING(256)
    },
    active: {
      type: DataTypes.BOOLEAN
    }
  })

  User.associate = (models) => {
    User.hasMany(models.Submission)
  }

  return User
}
