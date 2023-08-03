const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = require('./User')


const UserRule = sequelize.define('UserRule', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    terms_policies: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: null
    },
    visibity_adults_products: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    offers_notify: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    geolocalizations_notify: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    favorite_products_notify: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    recurring_purchase_notify: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    mail_newsteler: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: null
    },
    zap_newsteler: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: null
    },
    app_update: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
})

UserRule.belongsTo(User, { foreignKey: 'userID', allowNull: false })

UserRule.hasMany(User)

module.exports = UserRule