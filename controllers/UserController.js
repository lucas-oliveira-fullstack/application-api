const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//Helpers
const calculateAge = require('../helpers/calculate-age')
const confirmEmail = require('../helpers/validation-email')
const addressInfoByCEP = require('../helpers/take-address-info')

module.exports = class UserController {

    static async personalData(req, res) {
        const {
            name,
            email,
            cpf,
            cell_phone,
            birth_date,
            age,
            gender
        } = req.body

        //Check if email is valid
        if(!emailRegex.test(email)) {
            res.status(422).json({message: 'E-mail inválido'})

            return
        }

        //Recive age
        const newAge = calculateAge.takeAge(birth_date)

        try {
            // Check required inputs
            if (!name || !email || !cell_phone || !birth_date || !gender) {
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
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async createSendCode(req, res) {
        const { name, email } = req.body

        try {
            await confirmEmail.sendVerificationCodeEmail(email, name)

            res.status(201).json({ message: 'E-mail enviado com sucesso!' })
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async confirmEmail(req, res) {
        const { validationCode } = req.body

        try {
            const user = await User.findOne({ where: { email: req.body.email } })

            if(!user) {
                res.status(404).json({ message: 'Usuário não encontrado!' })

                return
            }

            if(user.validationCode !== validationCode) {
                res.status(400).json({ message: 'Código inválido' })

                return
            }

            imageProfile
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async profileImage(req, res) {

    }

    static async address(req, res) {
        const { postal_code, house_number, complement } = req.body

        try {
            //Address info
            const addressInfo = await addressInfoByCEP.getAddressInfoByCEP(postal_code)
            const newStreetName = addressInfo.logradouro
            const newNeighborhood = addressInfo.bairro
            const newCity = addressInfo.localidade
            const newState = addressInfo.uf
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async register(req, res) {
        const {
            photo
        } = req.body
        
        try {

            

            // Create user
            const newUser = await User.create({
                photo,
                postal_code,
                street_name: newStreetName,
                house_number,
                complement,
                neighborhood: newNeighborhood,
                city: newCity,
                state: newState,
            })

            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
