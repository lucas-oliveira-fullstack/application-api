const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Users = require('./Users')

const UsersAddresses = sequelize.define('UsersAddresses', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    address_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    street_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    house_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

UsersAddresses.belongsTo(Users, { foreignKey: 'usersID', allowNull: false })

module.exports = UsersAddresses