const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoPart = require('./AutoPart')
const Market = require('./Market')
const Pharmacy = require('./Pharmacy')
const User = require('./User')

const UserSelectedStore = sequelize.define ('UsersSelectedStores', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }
})

UserSelectedStore.belongsTo(AutoPart, { foreignKey: 'autopartID', allowNull: true })
UserSelectedStore.belongsTo(Market, { foreignKey: 'marketID', allowNull: true })
UserSelectedStore.belongsTo(Pharmacy, { foreignKey: 'pharmacyID', allowNull: true })
UserSelectedStore.belongsTo(User, { foreignKey: 'userID', allowNull: false })

UserSelectedStore.hasMany(AutoPart)
UserSelectedStore.hasMany(Market)
UserSelectedStore.hasMany(Pharmacy)
UserSelectedStore.hasMany(User)

module.exports = UserSelectedStore