const express = require('express')
const cors = require('cors')

const app = express()

//db conection
const conn = require('./db/conn')

//Import models


//Config JSON response
app.use(express.json())

//Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5001' }))

//Public folder for images
app.use(express.static('public'))

//Routes

app.listen(5001)