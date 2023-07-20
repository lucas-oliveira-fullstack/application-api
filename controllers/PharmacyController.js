const Pharmacy = require('../models/Pharmacies')

module.exports = class PharmacyController {

    static async showPharmacies(req, res) {

        const pharmacies = await Pharmacy.findAll({ raw: true })

        res.render('pharmacies/all', { pharmacies })
    }

    static createPharmacy(req, res) {
        
        res.render('pharmacies/create')
    }

    static async createPharmacySave(req, res) {

        const pharmacy = {
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

        await Pharmacy.create(pharmacy)

        res.redirect('/pharmacies')
    }

    static async updatePharmacy(req, res) {

        const id = req.params.id

        const pharmacy = await Pharmacy.findOne({where: { id: id }, raw: true})

        res.render('pharmacies/edit', { pharmacy })
    }

    static async updatePharmacyPost(req, res) {

        const id = req.body.id

        const pharmacy = {
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

        await AutoPart.update(pharmacy, {where: { id: id }})

        res.redirect('/pharmacies')
    }

    static async removePharmacy(req, res) {

        const id = req.body.id

        await Pharmacy.destroy({whre: { id: id }})

        res.redirect('/pharmacies')
    }
}