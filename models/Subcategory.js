const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Category = require('./Category')

const Subcategory = sequelize.define('Subcategory', {
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

Subcategory.belongsTo(Category, { foreignKey: 'categoryID', allowNull: false })

Subcategory.hasMany(Category)

module.exports = Subcategory