const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoPart = sequelize.define('AutoPart', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    logo: {
        type: DataTypes.BLOB,
        allowNull: true,
        defaultValue: null
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
        type: DataTypes.INTEGER,
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

module.exports = AutoPart