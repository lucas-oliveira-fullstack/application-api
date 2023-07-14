const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Users = require('./Users')
const Products = require('./Products')

const UsersFavoriteProducts = sequelize.define('UsersFavoriteProducts', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }
})

UsersFavoriteProducts.belongsTo(Users, { foreignKey: 'usersID' })
UsersFavoriteProducts.belongsTo(Products, { foreignKey: 'productsID' })

module.exports = UsersFavoriteProducts

