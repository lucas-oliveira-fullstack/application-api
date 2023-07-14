const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoParts = require('./AutoParts')
const Markets = require('./Markets')
const Pharmacies = require('./Pharmacies')
const Users = require('./Users')

const UsersSelectedStores = sequelize.define ('UsersSelectedStores', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }
})

UsersSelectedStores.belongsTo(AutoParts, { foreignKey: 'autopartsID', allowNull: true })
UsersSelectedStores.belongsTo(Markets, { foreignKey: 'autopartsID', allowNull: true })
UsersSelectedStores.belongsTo(Pharmacies, { foreignKey: 'autopartsID', allowNull: true })
UsersSelectedStores.belongsTo(Users, { foreignKey: 'autopartsID', allowNull: false })

module.exports = UsersSelectedStores