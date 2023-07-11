const { Sequelize, DataType, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Products = sequelize.define('Product', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    photo: {
        type: DataTypes.BLOB,
        required: false
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    brand: {
        type: DataTypes.STRING,
        required: true
    },
    description: {
        type: DataTypes.STRING,
        required: true
    },
    weight: {
        type: DataTypes.STRING,
        required: false
    },
    agegroupadults: {
        type: DataTypes.TINYINT,
        required: true
    }
})

module.exports = Products