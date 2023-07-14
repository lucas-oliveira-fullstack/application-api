const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const PaymentMethods = require('./PaymentMethods')

const Markets = sequelize.define('Markets', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        required: true
    },
    logo: {
        type: DataTypes.BLOB,
        required: false
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    phone_number: {
        type: DataTypes.STRING,
        required: true
    },
    open_close_monday_friday: {
        type: DataTypes.STRING,
        required: true
    },
    open_close_saturday: {
        type: DataTypes.STRING,
        required: true
    },
    open_close_sunday_holiday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postal_code: {
        type: DataTypes.STRING,
        required: true
    },
    street_name: {
        type: DataTypes.STRING,
        required: true
    },
    store_number: {
        type: DataTypes.STRING,
        required: true
    },
    complement: {
        type: DataTypes.STRING,
        required: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        required: true
    },
    state: {
        type: DataTypes.STRING,
        required: true
    }
})

Markets.belongsTo(PaymentMethods, { foreignKey: 'paymentmethodsID', allowNull: false })

module.exports = Markets