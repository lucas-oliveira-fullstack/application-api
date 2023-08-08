const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const StorePermissions = sequelize.define('StorePermissions',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = StorePermissions