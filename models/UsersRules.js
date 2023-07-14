const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Users = require('./Users')


const UsersRules = sequelize.define('UserRules', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    terms_policies: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    visibity_adults_products: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    validation_cod: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cod_validity: {
        type: DataTypes.STRING,
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
        allowNull: true
    },
    zap_newsteler: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    app_update: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
})

UsersRules.belongsTo(Users, { foreignKey: 'usersID', allowNull: false })

module.exports = UsersRules