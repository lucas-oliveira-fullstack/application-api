const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const OrdersStatus = require('./OrdersStatus')
const PaymentMethods = require('./PaymentMethods')
const StoresProducts = require('./StoresProducts')
const Users = require('./Users')

const UsersOrders = sequelize.define('UsersOrders', {
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

UsersOrders.belongsTo(OrdersStatus, { foreignKey: 'ordersstatusID', allowNull: false })
UsersOrders.belongsTo(PaymentMethods, { foreignKey: 'paymentmethodID', allowNull: false })
UsersOrders.belongsTo(StoresProducts, { foreignKey: 'autopartsID', allowNull: true})
UsersOrders.belongsTo(StoresProducts, { foreignKey: 'marketsID', allowNull: true})
UsersOrders.belongsTo(StoresProducts, { foreignKey: 'pharmaciesID', allowNull: true})
UsersOrders.belongsTo(StoresProducts, { foreignKey: 'productsID', allowNull: false})
UsersOrders.belongsTo(Users, { foreignKey: 'usersID', allowNull: false})

module.exports = UsersOrders