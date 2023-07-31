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

const UserOrder = sequelize.define('UserOrder', {
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

UserOrder.belongsTo(OrderStatus, { foreignKey: 'ordersstatusID', allowNull: false })
UserOrder.belongsTo(PaymentMethod, { foreignKey: 'paymentmethodID', allowNull: false })
UserOrder.belongsTo(AutoPart, { foreignKey: 'autopartID', allowNull: true})
UserOrder.belongsTo(Market, { foreignKey: 'marketID', allowNull: true})
UserOrder.belongsTo(Pharmacy, { foreignKey: 'pharmacyID', allowNull: true})
UserOrder.belongsTo(StoreProduct, { foreignKey: 'productID', allowNull: false})
UserOrder.belongsTo(User, { foreignKey: 'usersID', allowNull: false})

UserOrder.hasMany(OrderStatus)
UserOrder.hasMany(PaymentMethod)
UserOrder.hasMany(AutoPart)
UserOrder.hasMany(Market)
UserOrder.hasMany(Pharmacy)
UserOrder.hasMany(User)
UserOrder.hasMany(Product)

module.exports = UserOrder