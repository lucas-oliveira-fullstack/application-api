const { Sequelize, DataTypes }  = require('sequelize')
const sequelize = require('../db/conn')

const AutoParts = require('./AutoParts')
const Markets = require('./Markets')
const Pharmacies = require('./Pharmacies')
const Products = require('./Products')

const StoresProducts = sequelize.define('StoresProducts', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    max_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

StoresProducts.belongsTo(AutoParts, { foreignKey: 'autopartsID', allowNull: true })
StoresProducts.belongsTo(Markets, { foreignKey: 'marketsID', allowNull: true })
StoresProducts.belongsTo(Pharmacies, { foreignKey: 'phamaciesID', allowNull: true })
StoresProducts.belongsTo(Products, { foreignKey: 'productsID', allowNullL: false })

module.exports = StoresProducts