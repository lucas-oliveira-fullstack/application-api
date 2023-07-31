const { DataTypes }  = require('sequelize')
const sequelize = require('../db/conn')

const AutoPart = require('./AutoPart')
const Market = require('./Market')
const Pharmacy = require('./Pharmacy')
const Product = require('./Product')

const StoreProduct = sequelize.define('StoreProduct', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    max_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

StoreProduct.belongsTo(AutoPart, { foreignKey: 'autopartID', allowNull: true })
StoreProduct.belongsTo(Market, { foreignKey: 'marketID', allowNull: true })
StoreProduct.belongsTo(Pharmacy, { foreignKey: 'phamacyID', allowNull: true })
StoreProduct.belongsTo(Product, { foreignKey: 'productID', allowNull: false })

StoreProduct.hasMany(AutoPart)
StoreProduct.hasMany(Market)
StoreProduct.hasMany(Pharmacy)
StoreProduct.hasMany(Product)

module.exports = StoreProduct