const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Market = require('../models/Market')
const MarketUser = require('../models/StoreUser')

module.exports = class MarketPainelController {
    static async registerUser(req, res) {
        // Get Maket by id
        const id = req.params.id
        const marketId = await Market.findByPk(id)
        console.log('maketId:', marketId)

        const {
            name,
            email,
            phone,
            password,
            confirmpassword
        } = req.body

        // Check required inputs
        if(!name || !email || !phone || !password || !confirmpassword) {
            res.status(422).json({ message: 'Favor preencher os campos obrigatórios!' })

            return
        }

        // Check if market user exists
        const emailExists = await MarketUser.findOne({ where: { email: email } })

        if(emailExists) {
            res.status(422).json({ message: 'E-mail já está cadastrado, por favor utilize outro!' })

            return
        }

        // Check password and confirm password
        if(password !== confirmpassword) {
            res.status(422).json({ message: 'A senha e confirmação de senha precisam ser iguais!' })

            return
        }

        // Create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        try {
            // create market user
            const marketNewUser = {
                name,
                email,
                phone,
                password: passwordHash,
                marketID: marketId.id
            }

            await MarketUser.create(marketNewUser)

            res.status(200).json({ message: 'Usuário cadastrado com sucesso!', marketNewUser })
        } catch(error) {
            res.status(500).json({ message: error })
        }
    }
}