const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const PaymentMethods = require('./PaymentMethods')

const AutoParts = sequelize.define('AutoParts', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    logo: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    open_close_monday_friday: {
        type: DataTypes.STRING,
        allowNull: false
    },
    open_close_saturday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    open_close_sunday_holiday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    store_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

AutoParts.belongsTo(PaymentMethods, { foreignKey: 'paymentmethodsID', allowNull: false })

module.exports = AutoParts