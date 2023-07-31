const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoPart = require('./AutoParts')
const Market = require('./Markets')
const PaymentMethod = require('./PaymentMethods')
const Pharmacy = require('./Pharmacies')

const StorePaymentMethod = sequelize.define('StorePaymentMethod', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    }
})

StorePaymentMethod.belongsTo(AutoPart, { foreignKey: 'autopartID', allowNull: true })
StorePaymentMethod.belongsTo(Market, { foreignKey: 'marketID', allowNull: true })
StorePaymentMethod.belongsTo(Pharmacy, { foreignKey: 'pharmacyID', allowNull: true })
StorePaymentMethod.belongsTo(PaymentMethod, { foreignKey: 'paymentmethodID', allowNull: false })

StorePaymentMethod.hasMany(PaymentMethod)
StorePaymentMethod.hasMany(AutoPart)
StorePaymentMethod.hasMany(Market)
StorePaymentMethod.hasMany(Pharmacy)

module.exports = StorePaymentMethod