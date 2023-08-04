const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// Helpers
const createUserToken = require('../helpers/create-user-token')
const dateFormat = require('../helpers/date-format')
const takeAge = require('../helpers/calculate-age')
const addressInfoByCEP = require('../helpers/addres-info')

module.exports = class UserController {
    static async register(req, res) {
        const {
            cpf,
            email,
            name,
            cell_phone,
            birth_date,
            age,
            gender,
            postal_code,
            house_number,
            complement,
            password,
            confirmpassword,
        } = req.body

        // Check required inputs
        if(!email) {
            res.status(422).json({ message: 'E-mail é obrigatórios!' })
            
            return
        }

        if(!name) {
            res.status(422).json({ message: 'Nome é obrigatórios!' })
            
            return
        }

        if(!cell_phone) {
            res.status(422).json({ message: 'Celular é obrigatórios!' })
            
            return
        }

        if(!birth_date) {
            res.status(422).json({ message: 'Data de nascimento é obrigatórios!' })
            
            return
        }

        if(!gender) {
            res.status(422).json({ message: 'Genero é obrigatórios!' })
            
            return
        }

        if(!postal_code) {
            res.status(422).json({ message: 'CEP é obrigatórios!' })
            
            return
        }

        if(!house_number) {
            res.status(422).json({ message: 'Nº da casa é obrigatórios!' })
            
            return
        }

        if(!password) {
            res.status(422).json({ message: 'Senha é obrigatórios!' })

            return
        }

        if(!confirmpassword) {
            res.status(422).json({ message: 'Confirmar senha é obrigatórios!' })
            
            return
        }
       // if(!email || !name || !cell_phone  || !birth_date || !gender || !postal_code || !house_number || !password || !confirmpassword) {
       //     res.status(422).json({ message: 'Favor preencher os campos obrigatórios!' })

         //   return
        //}

        // Check if user exists
        const cpfExists = await User.findOne({ where: { cpf: cpf } })
        const emailExists = await User.findOne({ where: { email: email } })
        const cellExists = await User.findOne({ where: { cell_phone: cell_phone } })

        if(cpfExists) {
            res.status(422).json({ message: 'CPF já está cadastrado, por favor utilize outro!' })

            return
        }

        if(emailExists) {
            res.status(422).json({ message: 'E-mail já está cadastrado, por favor utilize outro!' })

            return
        }

        if(cellExists) {
            res.status(422).json({ message: 'Celular já está cadastrado, por favor utilize outro!' })

            return
        }
        
        // Image file
        let image
        if(req.file) {
            image = req.file.filename
        }

        // Check password and confirm password
        if(password !== confirmpassword){
            res.status(422).json({ message: 'A senha e confirmção de senha precisam ser iguais!' })

            return
        }

        // Format birth date
        const newBirthDate = dateFormat.formatDate(birth_date)

        // Calculate age
        const newAge = takeAge.calculateAge(newBirthDate)

        // Create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        

        try {
            // Address info by CEP
            const addressInfo = await addressInfoByCEP.getAddressInfoByCEP(postal_code)
            const newStreetName = addressInfo.logradouro
            const newNeighborhood = addressInfo.bairro
            const newCity = addressInfo.localidade
            const newState = addressInfo.uf

            // Create user
            const user = {
                cpf,
                email,
                name,
                cell_phone,
                birth_date: newBirthDate,
                age: newAge,
                gender,
                postal_code,
                street_name: newStreetName,
                house_number,
                complement,
                neighborhood: newNeighborhood,
                city: newCity,
                state: newState,
                password: passwordHash
            }

            await User.create(user)

            await createUserToken.createUserToken(user, req, res)
        } catch(error) {
            console.error(error)
            res.status(500).json({ message: error })
        }
    }
}