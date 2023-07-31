const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const OrderStatus = require('./OrderStatus')
const PaymentMethod = require('./PaymentMethod')
const StoreProduct = require('./StoreProduct')
const User = require('./User')
const AutoPart = require('./AutoPart')
const Market = require('./Market')
const Pharmacy = require('./Pharmacy')
const Product = require('./Product')

const UserPurchase = sequelize.define('UserPurchase', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_weight: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    withdraw: {
        type: DataTypes.TINYINT,
        allowNull:false
    },
    recive: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    delivery_price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: null
    },
    total_price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    }
})

UserPurchase.belongsTo(OrderStatus, { foreignKey: 'ordersstatusID', allowNull: false })
UserPurchase.belongsTo(PaymentMethod, { foreignKey: 'paymentmethodID', allowNull: false })
UserPurchase.belongsTo(AutoPart, { foreignKey: 'autopartID', allowNull: true})
UserPurchase.belongsTo(Market, { foreignKey: 'marketID', allowNull: true})
UserPurchase.belongsTo(Pharmacy, { foreignKey: 'pharmacyID', allowNull: true})
UserPurchase.belongsTo(StoreProduct, { foreignKey: 'productID', allowNull: false})
UserPurchase.belongsTo(User, { foreignKey: 'usersID', allowNull: false})

UserPurchase.hasMany(OrderStatus)
UserPurchase.hasMany(PaymentMethod)
UserPurchase.hasMany(AutoPart)
UserPurchase.hasMany(Market)
UserPurchase.hasMany(Pharmacy)
UserPurchase.hasMany(User)
UserPurchase.hasMany(Product)

module.exports = UserOrder