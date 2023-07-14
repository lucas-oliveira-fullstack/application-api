const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Users = require('./Users')

const UsersCards = sequelize.define('UsersCards', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    holder_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    card_name: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    security_cod: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    validity: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    card_type: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
})

UsersCards.belongsTo(Users, { foreignKey: 'usersID', allowNull: false })

module.exports = UsersCards