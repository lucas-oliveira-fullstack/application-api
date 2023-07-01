const { Sequelize }   = require('sequelize');

const db = new Sequelize('marketplace_dev', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql'
  });

db.authenticate()
.then(function(){
    console.log("Conexão com o bando de dados realizada com sucesso!!!!!");
}).catch(function(){
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
})

module.exports = db;