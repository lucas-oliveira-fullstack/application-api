const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoParts = require('./AutoParts')
const Markets = require('./Markets')
const Pharmacies = require('./Pharmacies')
const Users = require('./Users')

const UsersFavoriteStores = sequelize.define('UsersFavoriteStores', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }
})

UsersFavoriteStores.belongsTo(AutoParts, { foreignKey: 'autopartsID', allowNull: true})
UsersFavoriteStores.belongsTo(Markets, { foreignKey: 'marketsID', allowNull: true})
UsersFavoriteStores.belongsTo(Pharmacies, { foreignKey: 'pharmaciesID', allowNull: true})
UsersFavoriteStores.belongsTo(Users, { foreignKey: 'usersID', allowNull: false})

module.exports = UsersFavoriteStores