'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Users')

    if (!tableInfo.username) {
      await queryInterface.addColumn('Users', 'username', {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 50]
        }
      })
    }

    if (!tableInfo.email) {
      await queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      })
    }

    if (!tableInfo.password) {
      await queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 100]
        }
      })
    }

    if (!tableInfo.role) {
      await queryInterface.addColumn('Users', 'role', {
        type: Sequelize.ENUM,
        values: ['user', 'admin', 'moderator'],
        defaultValue: 'user',
        allowNull: false
      })
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Users')

    if (tableInfo.username) {
      await queryInterface.removeColumn('Users', 'username')
    }

    if (tableInfo.email) {
      await queryInterface.removeColumn('Users', 'email')
    }

    if (tableInfo.password) {
      await queryInterface.removeColumn('Users', 'password')
    }

    if (tableInfo.role) {
      await queryInterface.removeColumn('Users', 'role')
    }
  }
}
