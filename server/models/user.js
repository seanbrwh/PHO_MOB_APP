'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 50]
        }
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 100]
        }
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin', 'moderator'],
        defaultValue: 'user',
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          // Add logic to hash password before creating user
        },
        beforeUpdate: async (user) => {
          // Add logic to hash password before updating user
        }
      }
    }
  )

  User.createUser = async function (userData) {
    try {
      const user = await User.create(userData)
      return user
    } catch (error) {
      throw error
    }
  }

  User.getUserById = async function (id) {
    try {
      const user = await User.findByPk(id)
      return user
    } catch (error) {
      throw error
    }
  }

  User.updateUser = async function (id, updatedData) {
    try {
      const user = await User.findByPk(id)
      if (user) {
        await user.update(updatedData)
        return user
      }
      return null
    } catch (error) {
      throw error
    }
  }

  User.deleteUser = async function (id) {
    try {
      const user = await User.findByPk(id)
      if (user) {
        await user.destroy()
        return true
      }
      return false
    } catch (error) {
      throw error
    }
  }

  return User
}
