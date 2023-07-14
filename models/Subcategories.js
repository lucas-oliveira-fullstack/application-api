const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Categories = require('./Categories')

const Subcategories = sequelize.define('Subcategories', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Subcategories.belongsTo(Categories, { foreignKey: 'categoryID', allowNull: false })

module.exports = Subcategories