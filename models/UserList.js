const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = require('./Users')
const Product = require('./Products')

const UserList = sequelize.define('UserList', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

UserList.belongsTo(User, { foreignKey: 'userID', allowNull: false })
UserList.belongsTo(Product, { foreignKey: 'productID', allowNull: false })

UserList.hasMany(User)
UserList.hasMany(Product)

module.exports = UserList