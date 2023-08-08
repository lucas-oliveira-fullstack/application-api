const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoPart = require('./AutoPart')
const Market = require('./Market')
const Pharmacy = require('./Pharmacy')

const StoreUser = sequelize.define('StoreUser', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

AutoPart.hasMany(StoreUser, {
    foreignKey: 'autoPartID',
    allowNull: true,
    defaultValue: null
})
StoreUser.belongsTo(AutoPart)

Market.hasMany(StoreUser, {
    foreignKey: 'marketID',
    allowNull: true,
    defaultValue: null
})
StoreUser.belongsTo(Market)

Pharmacy.hasMany(StoreUser, {
    foreignKey: 'pharmacyID',
    allowNull: true,
    defaultValue: null
})
StoreUser.belongsTo(AutoPart)

module.exports = StoreUser