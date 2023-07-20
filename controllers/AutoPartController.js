const AutoPart = require('../models/AutoParts')

module.exports = class AutoPartController {

    static async showAutoParts(req, res) {

        const autoparts = await AutoPart.findAll({ raw: true })

        res.render('autoparts/all', { autoparts })
    }

    static createAutoPart(req, res) {
        
        res.render('autoparts/create')
    }

    static async createAutoPartSave(req, res) {

        const autopart = {
            logo: req.body.logo,
            name: req.body.name,
            phone_number: req.body.phone_number,
            open_close_monday_friday: req.body.open_close_monday_friday,
            open_close_saturday: req.body.open_close_saturday,
            open_close_sunday_holiday: req.body.open_close_sunday_holiday,
            postal_code: req.body.postal_code,
            street_name: req.body.street_name,
            store_number: req.body.store_number,
            complement: req.body.complement,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
            paymentmethodsID: req.body.paymentmethodsID
        }

        await AutoPart.create(autopart)

        res.redirect('/autoparts')
    }

    static async updateAutoPart(req, res) {

        const id = req.params.id

        const autopart = await AutoPart.findOne({where: { id: id }, raw: true})

        res.render('autoparts/edit', { autopart })
    }

    static async updateAutoPartPost(req, res) {

        const id = req.body.id

        const autopart = {
            logo: req.body.logo,
            name: req.body.name,
            phone_number: req.body.phone_number,
            open_close_monday_friday: req.body.open_close_monday_friday,
            open_close_saturday: req.body.open_close_saturday,
            open_close_sunday_holiday: req.body.open_close_sunday_holiday,
            postal_code: req.body.postal_code,
            street_name: req.body.street_name,
            store_number: req.body.store_number,
            complement: req.body.complement,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
            paymentmethodsID: req.body.paymentmethodsID
        }

        await AutoPart.update(autopart, {where: { id: id }})

        res.redirect('/autoparts')
    }

    static async removeAutoPart(req, res) {

        const id = req.body.id

        await AutoPart.destroy({whre: { id: id }})

        res.redirect('/autoparts')
    }
}