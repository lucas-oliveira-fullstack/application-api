const { Sequelize, DataType, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')


const Categories = sequelize.define('Categories', {
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
    }
})
module.exports = Categories