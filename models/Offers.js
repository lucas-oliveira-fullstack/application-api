const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoParts = require('./AutoParts')
const Markets = require('./Markets')
const Pharmacies = require('./Pharmacies')
const StoresProducts = require('./StoresProducts')
const Users = require('./Users')

const Offers = sequelize.define('Offers', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: true
    },
    old_price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
    },
    offer_price: {
        type: DataTypes.DECIMAL(5,2),
        allowNullL: true
    },
})

Offers.belongsTo(AutoParts, { foreignKey: 'autopartsID', allowNull: true})
Offers.belongsTo(Markets, { foreignKey: 'marketsID', allowNull: true })
Offers.belongsTo(Pharmacies, { foreignKey: 'pharmaciesID', allowNull: true })
Offers.belongsTo(StoresProducts, { foreignKey: 'productsID', allowNull: false })
Offers.belongsTo(Users, { foreignKey: 'usersID', allowNull: true })

module.exports = Offers