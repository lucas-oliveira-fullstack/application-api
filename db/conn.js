const { Sequelize }   = require('sequelize')

const db = new Sequelize('marketplace_dev2', 'root', 'root', {
    host: '127.0.0.1',
    port: 8889,
    dialect: 'mysql'
  })

module.exports = db