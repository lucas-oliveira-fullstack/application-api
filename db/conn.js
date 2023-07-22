const { Sequelize }   = require('sequelize')

const db = new Sequelize('marketplace_dev', 'oliveira', 'M15i13G11@', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
  })

module.exports = db