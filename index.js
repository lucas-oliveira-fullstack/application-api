const express = require('express')
const { engine: handlebarsEngine } = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

//Models
const AutoParts = require('./models/AutoParts')
const Categories = require('./models/Categories')
const ExclusiveCoupons = require('./models/ExclusiveCoupons')
const Markets = require('./models/Markets')
const Offers = require('./models/Offers')
const OrdersStatus = require('./models/OrdersStatus')
const PaymentMethods = require('./models/PaymentMethods')
const Pharmacies = require('./models/Pharmacies')
const Products = require('./models/Products')
const StoreProducts = require('./models/StoresProducts')
const Subcategories = require('./models/Subcategories')
const Users = require('./models/Users')
const UsersAddresses = require('./models/UsersAddresses')
const UsersCards = require('./models/UsersCards')
const UsersFavoriteProducts = require('./models/UsersFavoriteProducts')
const UsersFavoriteStores = require('./models/UsersFavoriteStores')
const UsersLists = require('./models/UsersLists')
const UsersOrders = require('./models/UsersOrders')
const UsersPurcheses = require('./models/UsersPurcheses')
const UsersRules = require('./models/UsersRules')
const UsersSelectedStores = require('./models/UsersSelectedStores')

//Router
const autopartsRoutes = require('./routes/autoPartsRoutes')
const marketsRoutes = require('./routes/marketsRoutes')
const pharmaciesRoutes = require('./routes/pharmaciesRoutes')
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

app.use('/autoparts', autopartsRoutes)

app.use('/markets', marketsRoutes)

app.use('/pharmaciews', pharmaciesRoutes)

app.use('/users', usersRoutes)

conn
.sync()
.then(() => {
  app.listen(8000)
}).catch((err) => console.log(err))
