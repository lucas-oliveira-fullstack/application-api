const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Subcategories = require('./Subcategories')

const Products = sequelize.define('Products', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adults_product: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
})

Products.belongsTo(Subcategories, { foreignKey: 'subcategoriesID', allowNull: false })

module.exports = Products