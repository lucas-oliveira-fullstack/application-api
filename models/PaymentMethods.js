const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const PaymentMethod = sequelize.define('PaymentMethod', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    method_icon: {
        type: DataTypes.BLOB,
        allowNull: true,
        defaultValue: true
    },
    method_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = PaymentMethod