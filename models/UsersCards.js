const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = require('./Users')

const UserCard = sequelize.define('UserCard', {
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

UserCard.belongsTo(User, { foreignKey: 'userID', allowNull: false })

UserCard.hasMany(User)

module.exports = UserCard