const express = require('express')
const { engine: handlebarsEngine } = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

//Models
const User = require('./models/Users')

//Router
const usersRoutes = require('./routes/usersRoutes')

app.engine('handlebars', handlebarsEngine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('home')
})

app.use('/users', usersRoutes)

conn
.sync()
.then(() => {
  app.listen(8000)
}).catch((err) => console.log(err))
