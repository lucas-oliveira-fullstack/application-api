const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoPart = require('./AutoParts')
const Market = require('./Markets')
const Pharmacy = require('./Pharmacies')
const StoreProduct = require('./StoresProducts')

const Offer = sequelize.define('Offer', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: true
    },
    old_price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: true
    },
    offer_price: {
        type: DataTypes.DECIMAL(5,2),
        allowNullL: true,
        defaultValue: true
    }
})

Offer.belongsTo(AutoPart, { foreignKey: 'autopartID', allowNull: true})
Offer.belongsTo(Market, { foreignKey: 'marketID', allowNull: true })
Offer.belongsTo(Pharmacy, { foreignKey: 'pharmacyID', allowNull: true })
Offer.belongsTo(StoreProduct, { foreignKey: 'productID', allowNull: false })

Offer.hasMany(AutoPart)
Offer.hasMany(Market)
Offer.hasMany(Pharmacy)
Offer.hasMany(StoreProduct)

module.exports = Offer