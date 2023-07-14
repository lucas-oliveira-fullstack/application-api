const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const PaymentMethods = require('./PaymentMethods')
const StoresProducts = require('./StoresProducts')
const Users = require('./Users')

const UsersPurcheses = sequelize.define('UsersPurcheses', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_weight: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    withdraw: {
        type: DataTypes.TINYINT,
        allowNull:false
    },
    recive: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    delivery_price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
    },
    total_price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    }
})

UsersPurcheses.belongsTo(PaymentMethods, { foreignKey: 'paymentmethodID', allowNull: false })
UsersPurcheses.belongsTo(StoresProducts, { foreignKey: 'autopartsID', allowNull: true})
UsersPurcheses.belongsTo(StoresProducts, { foreignKey: 'marketsID', allowNull: true})
UsersPurcheses.belongsTo(StoresProducts, { foreignKey: 'pharmaciesID', allowNull: true})
UsersPurcheses.belongsTo(StoresProducts, { foreignKey: 'productsID', allowNull: false})
UsersPurcheses.belongsTo(Users, { foreignKey: 'usersID', allowNull: false})

module.exports = UsersPurcheses