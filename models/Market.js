const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Market = sequelize.define('Market', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    logo: {
        type: DataTypes.BLOB,
        allowNull: true,
        defaultValue: null
    },
    registered_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fantasy_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cell_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    open_close_monday_friday: {
        type: DataTypes.STRING,
        allowNull: false
    },
    open_close_saturday: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    open_close_sunday_holiday: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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
        type: DataTypes.STRING,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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

module.exports = Market