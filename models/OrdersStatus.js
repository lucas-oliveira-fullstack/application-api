const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const OrderStatus = sequelize.define('OrderStatus', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = OrderStatus