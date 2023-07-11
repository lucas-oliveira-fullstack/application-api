const { Sequelize, DataType, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = require('./Users')


const UserRules = sequelize.define('UserRules', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    terms_policies: {
        type: DataTypes.TINYINT,
        required: false
    },
    visibityadultsproducts: {
        type: DataTypes.TINYINT,
        required: true
    },
    validation_cod: {
        type: DataTypes.INTEGER,
        required: true
    },
    cod_validity: {
        type: DataTypes.STRING,
        required: true
    },
    notifications: {
        type: DataTypes.TINYINT,
        required: true
    },
})

UserRules.belongsTo(User, { foreignKey: 'userID' })

module.exports = UserRules