const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoPart = require('./AutoParts')
const Market = require('./Market')
const Pharmacy = require('./Pharmacy')
const StoreProduct = require('./StoreProduct')
const User = require('./User')


const ExclusiveCoupon = sequelize.define('ExclusiveCoupon', {
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
    validity: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: null
    }
})

ExclusiveCoupon.belongsTo(AutoPart, { foreignKey: 'autopartID', allowNull: true})
ExclusiveCoupon.belongsTo(Market, { foreignKey: 'marketID', allowNull: true })
ExclusiveCoupon.belongsTo(Pharmacy, { foreignKey: 'pharmacyID', allowNull: true })
ExclusiveCoupon.belongsTo(StoreProduct, { foreignKey: 'productID', allowNull: false })
ExclusiveCoupon.belongsTo(User, { foreignKey: 'userID', allowNull: true })

ExclusiveCoupon.hasMany(AutoPart)
ExclusiveCoupon.hasMany(Market)
ExclusiveCoupon.hasMany(Pharmacy)
ExclusiveCoupon.hasMany(StoreProduct)
ExclusiveCoupon.hasMany(User)

module.exports = ExclusiveCoupon
