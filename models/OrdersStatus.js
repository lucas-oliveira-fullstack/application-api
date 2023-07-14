const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const OrdersStatus = sequelize.define('OrdersStatus', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    }
})

module.exports = OrdersStatus