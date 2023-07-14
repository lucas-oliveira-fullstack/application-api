const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const AutoParts = require('./AutoParts')
const Markets = require('./Markets')
const Pharmacies = require('./Pharmacies')
const StoresProducts = require('./StoresProducts')
const Users = require('./Users')


const ExclusiveCoupons = sequelize.define('ExclusiveCoupons', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    validity: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: true
    }
})

ExclusiveCoupons.belongsTo(AutoParts, { foreignKey: 'autopartsID', allowNull: true})
ExclusiveCoupons.belongsTo(Markets, { foreignKey: 'marketsID', allowNull: true })
ExclusiveCoupons.belongsTo(Pharmacies, { foreignKey: 'pharmaciesID', allowNull: true })
ExclusiveCoupons.belongsTo(StoresProducts, { foreignKey: 'productsID', allowNull: false })
ExclusiveCoupons.belongsTo(Users, { foreignKey: 'usersID', allowNull: true })

module.exports = ExclusiveCoupons
