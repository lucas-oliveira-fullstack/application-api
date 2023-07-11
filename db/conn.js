const { Sequelize }   = require('sequelize')

const db = new Sequelize('marketplace_dev', 'root', 'root', {
    host: '127.0.0.1',
    port: 8889,
    dialect: 'mysql'
  })

try {

    db.authenticate()
    console.log('Banco de dados conectado com sucesso!')

} catch(err) {
    console.log('Conexão com o banco falhou!', err)
}

module.exports = db