const { Sequelize, DataType, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = sequelize.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    CPF: {
        type: DataTypes.STRING,
        required: false
    },
    mail: {
        type: DataTypes.STRING,
        required: true
    },
    name: {
        type: DataTypes.TEXT,
        required: true
    },
    cell_phone: {
        type: DataTypes.STRING,
        required: true
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        required: true
    },
    age: {
        type: DataTypes.INTEGER,
        required: true
    },
    gender: {
        type: DataTypes.TINYINT,
        required: true
    },
    photo: {
        type: DataTypes.BLOB,
        required: false
    },
    postal_code: {
        type: DataTypes.STRING,
        required: true
    },
    street_name: {
        type: DataTypes.STRING,
        required: true
    },
    house_number: {
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
module.exports = User