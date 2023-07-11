const { Sequelize, DataType, DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cell_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    photo: {
        type: DataTypes.BLOB,
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
    },
    password_18: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
module.exports = User;