const User = require('../models/Users')

module.exports = class UserController {

    static async showUsers(req, res) {

        const users = await User.findAll({ raw: true })

        .then((data) => {

            let emptyUsers = false

            if(data.length === 0) {
                emptyUsers = true
            }

            res.render('users/all', { users: data, emptyUsers })
        })
        .catch((err) => console.log(err))
    }

    static createUser(req,res) {
        res.render('users/create')
    }

    static async createUserSave(req,res) {

        const user = {
            cpf: req.body.cpf,
            mail: req.body.mail,
            name: req.body.name,
            cell_phone: req.body.cell_phone,
            birth_date: req.body.birth_date,
            age: req.body.age,
            gender: req.body.gender,
            photo: req.body.photo,
            postal_code: req.body.postal_code,
            street_name: req.body.street_name,
            house_number: req.body.house_number,
            complement: req.body.complement,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
        }

        await User.create(user)

        res.redirect('/users')
    }

    static updateUser(req, res) {

        const id = req.params.id

        User.findOne({where: { id: id }, raw: true})

        .then((data) => {

            res.render('users/edit', { user: data })
        })
        .catch((err) => console.log(err))
    }

    static async updateUserPost(req, res) {

        const id = req.body.id

        const user = {
            name: req.body.name,
            birth_date: req.body.birth_date,
            cell_phone: req.body.cell_phone,
            password_18: req.body.password_18
        }

        User.update(user, { where: { id: id } })

        .then(res.redirect('/users'))
        
        .catch((err) => console.log(err))
    }

    static async removeUser(req,res) {
        
        const id = req.body.id

        await User.destroy({where: {id: id}})

        res.redirect('/users')
    }
}