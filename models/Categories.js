const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')


const Categories = sequelize.define('Categories', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    photo: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Categories