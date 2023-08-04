const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = sequelize.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
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
    profile_image: {
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
    house_number: {
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
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    password_18: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    validation_email: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    validation_cell: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    }
})

module.exports = User