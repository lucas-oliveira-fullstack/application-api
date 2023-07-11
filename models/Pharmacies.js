const { Sequelize, DataType, DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Pharmacy = sequelize.define('Pharmacy', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: true
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
    open_monday_friday: {
        type: DataTypes.TIME,
        allowNull: false
    },
    close_monday_friday: {
        type: DataTypes.TIME,
        allowNull: false
    },
    open_saturday: {
        type: DataTypes.TIME,
        allowNull: true
    },
    close_saturday: {
        type: DataTypes.TIME,
        allowNull: true
    },
    open_sunday_holiday: {
        type: DataTypes.TIME,
        allowNull: true
    },
    close_sunday_holiday: {
        type: DataTypes.TIME,
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
    house_number: {
        type: DataTypes.STRING,
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
});

module.exports = Pharmacy;