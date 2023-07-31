const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = require('./Users')
const Product = require('./Products')

const UserFavoriteProduct = sequelize.define('UserFavoriteProduct', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }
})

UserFavoriteProduct.belongsTo(User, { foreignKey: 'userID' })
UserFavoriteProduct.belongsTo(Product, { foreignKey: 'productID' })

UserFavoriteProduct.hasMany(User)
UserFavoriteProduct.hasMany(Product)

module.exports = UserFavoriteProduct

