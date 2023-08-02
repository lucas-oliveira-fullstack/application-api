const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

//Helpers
const calculateAge = require('../helpers/calculate-age')
const confirmEmail = require('../helpers/validation-email')
const addressInfoByCEP = require('../helpers/take-address-info')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const checkAgeAndRequestPassword = require('../helpers/check-age-password')

module.exports = class UserController {

    constructor() {
        //Temporary variable for storing user data between the steps of the register flow
        this.userData = {}
    }

    static async personalData(req, res) {
        const {
            name,
            email,
            cpf,
            cell_phone,
            birth_date,
            age,
            gender,
            password_18,
            confirm_password_18,
            password,
            confirm_password,
        } = req.body

        //Check if email is valid
        if(!emailRegex.test(email)) {
            res.status(422).json({ message: 'E-mail inválido' })

            return
        }

        //Recive age
        const newAge = calculateAge.takeAge(birth_date)

        // Check if user is 18 ao older
        const { requestPassword, message } = await checkAgeAndRequestPassword(newAge)

        try {
            // Check required inputs
            if (!name || !email || !cell_phone || !birth_date || !gender || !password || !confirm_password) {
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

            // Check password and confirmpassword
            if(password !== confirm_password) {
                res.status(422).json({message: 'O campo confirmar senha deve ser igual ao campo senha!'})

                return
            }
            
            // Create password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            // Create password18
            let password18Hash = null

            if (requestPassword) {
                // Check password18 and confirmpassword18
                if(password_18 !== confirm_password_18) {
                   res.status(422).json({message: 'O campo confirmar senha deve ser igual ao campo senha!'})
   
                   return
               }
               
               // Create password 18
               const salt = await bcrypt.genSalt(12)
               password18Hash = await bcrypt.hash(password_18, salt)
             }

            // Temporarily stores user personal info
            this.userData = {
                ...this.userData,
                name,
                email,
                cpf,
                cell_phone,
                birth_date,
                age: newAge,
                gender,
                password: passwordHash,
                password_18: password18Hash
            }

            res.status(200).json({ message: 'Dados pessoais salvos com sucesso!' })
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
            //Check if user input name and email
            if(!this.userData.name || !this.userData.email) {
                res.status(400).json({ message: 'Você precisa preencher os dados pessoais e enviar o código de confirmação por e-mail primeiro' })

                return
            }

            const user = await User.findOne({ where: { email: req.body.email } })

            if(!user) {
                res.status(404).json({ message: 'Usuário não encontrado!' })

                return
            }

            if(user.validation_email !== validationCode) {
                res.status(400).json({ message: 'Código inválido' })

                return
            }

            //Update userData object to remove validation code and confirm email validate
            this.userData = {
                ...this.userData,
                validation_email: null
            }
            
            res.status(200).json({ message: 'E-mail confirmado com sucesso!' })
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async profileImage(req, res) {
        if(req.file) {
            this.userData.photo = req.file.filename
        }
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

            //Temporarily stores user personal info
            this.userData = {
                ...this.userData,
                postal_code,
                house_number,
                complement,
                street_name: newStreetName,
                neighborhood: newNeighborhood,
                city: newCity,
                state: newState,
            }

            res.status(200).json({ message: 'Endereço salvo com sucesso!' })

        } catch(error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async register(req, res) {
        try {
            //Check if all the data has been filled in
            if(Object.keys(this.userData).length === 0) {
                res.status(400).json({ message: 'Você precisa preencher todos os dados antes de finalizar o cadastro' })

                return
            }

            //Create user with userData
            const newUser = await User.create(this.userData)

            //Cleans the temporary data
            this.userData = {}

            // Create token ando send res with token after user creation
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async loginByEmail(req, res) {
        const {email, password} = req.body

        if(!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
        }

        if(!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
        }

        // Check if user exists
        const user = await User.findOne({ where: { email: email } })

        if(!user) {
            res.status(422).json({ message: 'E-mail não encontrado, utilize o mesmo e-mail utilizado no cadastro!' })

            return
        }

        // Check id password match
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword) {
            res.status(422).json({ message: 'Senha inválida!' })

            return
        }

        await createUserToken(user, req, res)
    }

    static async resetPasswordByEmail(req, res) {
        const { email, password, confirm_password } = req.body

        // Check password and confirmpassword
        if(password !== confirm_password) {
            res.status(422).json({message: 'O campo confirmar senha deve ser igual ao campo senha!'})

            return
        }
        
        try {
            // Find user in db
            const user = await User.findOne ({ where: { email: email } })

            // Check if user exists
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado!' })

                return
            }

            // Create password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash

            // Save user new password
            await user.save()

            res.status(200).json({ message: 'Senha alterada com sucesso!' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async resetPasswordByCell(req, res) {
        const { cell_phone, password, confirm_password } = req.body

        // Check password and confirmpassword
        if(password !== confirm_password) {
            res.status(422).json({message: 'O campo confirmar senha deve ser igual ao campo senha!'})

            return
        }
        
        try {
            // Find user in db
            const user = await User.findOne ({ where: { cell_phone: cell_phone } })

            // Check if user exists
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado!' })

                return
            }

            // Create password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash

            // Save user new password
            await user.save()

            res.status(200).json({ message: 'Senha alterada com sucesso!' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    static async loginByCell(req, res) {
        const {cell_phone, password} = req.body

        if(!cell_phone) {
            res.status(422).json({ message: 'O celular é obrigatório!' })
        }

        if(!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
        }

        // Check if user exists
        const user = await User.findOne({ where: { cell_phone: cell_phone } })

        if(!user) {
            res.status(422).json({ message: 'Celular não encontrado, utilize o mesmo número utilizado no cadastro!' })

            return
        }

        // Check id password match
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword) {
            res.status(422).json({ message: 'Senha inválida!' })

            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if(req.henders.authoriztion) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findByPk(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        })

        if(!user) {
            res.status(422).json({ message: 'Usuário não encontrado' })

            return
        }

        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        try {
            const token = getToken(req)

            const user = await getUserByToken(token)

            const {
                name,
                birth_date,
                age,
                cell_phone,
                password,
                confirm_password,
                password_18,
                confirm_password_18
            } = req.body
        
            let profileImage = ''

            if (req.file) {
                profileImage = req.file.filename
            }

            // Edit user name
            user.name = name

            // Edit birth_date
            user.birth_date = birth_date

            // Edit age
            const newAge = calculateAge.takeAge(birth_date)

            user.age = newAge

            // Check if user is 18 ao older
            const { requestPassword, message } = await checkAgeAndRequestPassword(newAge)

            // Edit cell_phone
            user.cell_phone = cell_phone

            // Edit password
            // Check password and confirmpassword
            if(password !== confirm_password) {
                res.status(422).json({message: 'O campo confirmar senha deve ser igual ao campo senha!'})

                return
            }
        
            // Create password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash

            // Create password18
            let password18Hash = null

            if (requestPassword) {
                if(!password_18) {
                    // Check password18 and confirmpassword18
                    if(password_18 !== confirm_password_18) {
                        res.status(422).json({message: 'O campo confirmar senha deve ser igual ao campo senha!'})
 
                        return
                    }
            
                    // Create password 18
                    const salt = await bcrypt.genSalt(12)
                    password18Hash = await bcrypt.hash(password_18, salt)

                    user.password_18 = password18Hash
                }
            }

            // Save the updated user to the database
            await user.save()
        } catch(error) {
            req.status(500).json({ message: error.message })
        }
    }
}
