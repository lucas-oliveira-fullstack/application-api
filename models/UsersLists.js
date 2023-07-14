const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Users = require('./Users')
const Products = require('./Products')

const UsersLists = sequelize.define('UsersLists', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

UsersLists.belongsTo(Users, { foreignKey: 'usersID', allowNull: false })
UsersLists.belongsTo(Products, { foreignKey: 'productsID', allowNull: false })

module.exports = UsersLists