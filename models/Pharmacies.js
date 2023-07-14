const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const PaymentMethods = require('./PaymentMethods')

const Pharmacies = sequelize.define('Pharmacies', {
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
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    open_close_monday_friday: {
        type: DataTypes.STRING,
        allowNull: false
    },
    open_close_saturday: {
        type: DataTypes.STRING,
        allowNull: false
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

Pharmacies.belongsTo(PaymentMethods, { foreignKey: 'paymentmethodsID', allowNull: false })

module.exports = Pharmacies