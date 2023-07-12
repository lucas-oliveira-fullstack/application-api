const User = require('../models/Users')

module.exports = class UserCotroller {

    static async showUsers(req, res) {

        const users = await User.findAll({ raw: true })
        res.render('users/all', { users })
    }

    static createUser(req,res) {
        res.render('users/create')
    }

    static async createUserSave(req,res) {

        const user = {
            CPF: req.body.CPF,
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
}