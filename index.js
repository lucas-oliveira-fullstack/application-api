const express = require('express')
const cors = require('cors')

const app = express()

//db conection
const conn = require('./db/conn')

//Import models
const User = require('./models/User')
const UserRules = require('./models/UserRule')

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

const startServer = async () => {
    try {
        // Synchronize model with database an create table
        await conn.sync({ force: true })
        // await conn.sync()

        // Start server after synchronizing models
        app.listen(5001, () => {
            console.log('Servidor está rodando na porta 5001')
        }) 
    } catch (err) {
        console.error('Erro para iniciar o servidor', err.message)
    }
}

startServer()