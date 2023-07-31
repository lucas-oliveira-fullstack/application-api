const express = require('express')
const cors = require('cors')

const app = express()

//db conection
const conn = require('./db/conn')

//Import models
const User = require('./models/User')

//Import routes
const userRoutes = require('./routes/userRoutes')

//Config JSON response
app.use(express.json())

//Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5001' }))

//Public folder for images
app.use(express.static('public'))

//Routes
app.use('/users', userRoutes)

//app.listen(5001)
conn
//.sync({ force: true })
.sync()
.then(() => {
    app.listen(5001)
})
.catch((err) => console.log(err))