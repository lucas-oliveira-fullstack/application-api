const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../db/conn')

const PaymentMethods = sequelize.define('PaymentMethods', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    method_icon: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    method_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
module.exports = PaymentMethods