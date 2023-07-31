const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Subcategory = require('./Subcategory')

const Product = sequelize.define('Product', {
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
    weight: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    adults_product: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
})

Product.belongsTo(Subcategory, { foreignKey: 'subcategoryID', allowNull: false })

Product.hasMany(Subcategory)

module.exports = Product