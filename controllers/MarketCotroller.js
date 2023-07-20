const Market = require('../models/Markets')

module.exports = class MarketController {

    static async showMarkets(req, res) {

        const markets = await Market.findAll({ raw: true })

        res.render('markets/all', { markets })
    }

    static createMarket(req, res) {
        
        res.render('markets/create')
    }

    static async createMarketSave(req, res) {

        const market = {
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

        await Market.create(market)

        res.redirect('/markets')
    }

    static async updateMarket(req, res) {
        
        const id = req.params.id

        const market = await Market.findOne({where: { id: id }, raw: true})

        res.render('markets/edit', { market })
    }

    static async updateMarketPost(req, res) {

        const id = req.body.id

        const market = {
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

        await Market.update(market, {whre: { id: id }})

        res.redirect('/markets')
    }

    static async removeMarket(req, res) {

        const id = req.body.id

        await Market.destroy({where: { id: id }})

        res.redirect('/markets')
    }
}