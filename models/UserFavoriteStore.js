const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoPart = require('./AutoParts')
const Market = require('./Markets')
const Pharmacy = require('./Pharmacies')
const User = require('./Users')

const UserFavoriteStore = sequelize.define('UserFavoriteStore', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }
})

UserFavoriteStore.belongsTo(AutoPart, { foreignKey: 'autopartsID', allowNull: true})
UserFavoriteStore.belongsTo(Market, { foreignKey: 'marketsID', allowNull: true})
UserFavoriteStore.belongsTo(Pharmacy, { foreignKey: 'pharmaciesID', allowNull: true})
UserFavoriteStore.belongsTo(User, { foreignKey: 'usersID', allowNull: false})

UserFavoriteStore.hasMany(AutoPart)
UserFavoriteStore.hasMany(Market)
UserFavoriteStore.hasMany(Pharmacy)

module.exports = UserFavoriteStore