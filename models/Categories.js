const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')


const Category = sequelize.define('Category', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    photo: {
        type: DataTypes.BLOB,
        allowNull: true,
        defaultValue: null
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Category