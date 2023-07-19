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

    static async updateUser(req, res) {

        const id = req.params.id

        const user = await User.findOne({where: { id: id }, raw: true})

        res.render('users/edit', { user })
    }

    static async updateUserPost(req, res) {

        const id = req.body.id

        const user = {
            name: req.body.name,
            birth_date: req.body.birth_date,
            cell_phone: req.body.cell_phone,
            password_18: req.body.password_18
        }

        await User.update(user, {where: {id: id}})

        res.redirect('/users')
    }

    static async removeUser(req,res) {
        
        const id = req.body.id

        await User.destroy({where: {id: id}})

        res.redirect('/users')
    }
}