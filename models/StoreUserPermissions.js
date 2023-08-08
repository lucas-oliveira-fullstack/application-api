const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const StoreUser = require('./StoreUser')
const StorePermissions = require('./StorePermissions')

const StoreUserPermission = sequelize.define('StoreUserPermission', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    }
})

StoreUserPermission.hasOne(StoreUser, {
    foreignKey: 'storeuserID',
    allowNull: false
})

StoreUserPermission.hasOne(StorePermissions, {
    foreignKey: 'storepermissionID',
    allowNull: false
})

module.exports = StoreUserPermission