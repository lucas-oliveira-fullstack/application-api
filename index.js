const express = require('express')
const { engine: handlebarsEngine } = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const User = require('./models/Users')
const UserRules = require('./models/UserRules')
const Market = require('./models/Markets')
const AutoParts = require('./models/AutoParts')
const Pharmacies = require('./models/Pharmacies')
const Products = require('./models/Products')
const Categories = require('./models/Categories')
const SubCategories = require('./models/Subcategories')

app.engine('handlebars', handlebarsEngine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(express.static('public'))

conn
.sync()
.then(() => {
  app.listen(8000)
}).catch((err) => console.log(err))
