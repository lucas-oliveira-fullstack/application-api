const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//Helpers
const calculateAge = require('../helpers/calculate-age')
const confirmEmail = require('../helpers/validation-email')
const addressInfoByCEP = require('../helpers/take-address-info')

module.exports = class UserController {
    static async register(req, res) {
        const {
            name,
            email,
            cpf,
            cell_phone,
            birth_date,
            age,
            gender,
            photo,
            postal_code,
            house_number,
            complement,
        } = req.body

        //Check if email is valid
        if(!emailRegex.test(email)) {
            res.status(422).json({message: 'E-mail inválido'})

            return
        }

        //Recive age
        const newAge = calculateAge.takeAge(birth_date)

        //Confirm email
        try {

            await confirmEmail.sendVerificationCodeEmail(email, name)
        } catch (error) {

            res.status(500).json({ message: error.message })

            return
        }
        
        try {

            //Address info
            const addressInfo = await addressInfoByCEP.getAddressInfoByCEP(postal_code)
            const newStreetName = addressInfo.logradouro
            const newNeighborhood = addressInfo.bairro
            const newCity = addressInfo.localidade
            const newState = addressInfo.uf

            // Check required inputs
            if (!name || !email || !cell_phone || !birth_date || !gender || !postal_code || !house_number) {
                res.status(422).json({ message: 'Preencha todos os campos obrigatórios!' })
                return
            }

            // Check if user exists
            const mailExists = await User.findOne({ where: { email: email } })
            const cellExists = await User.findOne({ where: { cell_phone: cell_phone } })

            if (mailExists || cellExists) {
                res.status(422).json({ message: 'E-mail ou Celular já está sendo utilizado, por favor utilize outro!' })
                return
            }

            // Create user
            const newUser = await User.create({
                name,
                email,
                cpf,
                cell_phone,
                birth_date,
                age: newAge,
                gender,
                photo,
                postal_code,
                street_name: newStreetName,
                house_number,
                complement,
                neighborhood: newNeighborhood,
                city: newCity,
                state: newState,
            })

            // Optionally, you can return the created user
            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
