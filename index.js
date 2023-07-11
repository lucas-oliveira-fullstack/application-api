const express = require('express')
const { engine: handlebarsEngine } = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

app.engine('handlebars', handlebarsEngine());
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(express.static('public'))

app.listen(8000)
