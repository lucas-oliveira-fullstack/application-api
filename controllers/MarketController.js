const jwt = require('jsonwebtoken')

const Market = require('../models/Market')

// Helpers
const createMarketToken = require('../helpers/create-market-token')
const addressInfoByCEP = require('../helpers/take-address-info')
const getToken = require('../helpers/get-token')
const { imageUpload } = require('../helpers/image-upload')

module.exports = class MarketController {
    static async register(req, res) {
        const {
            logo,
            registered_name,
            cnpj,
            phone_number,
            open_close_monday_friday,
            open_close_saturday,
            open_close_sunday_holiday,
            postal_code,
            store_number,
            complement,
        } = req.body

        // Validate required input
        if(!registered_name || !cnpj || !phone_number || !open_close_monday_friday || !open_close_saturday || !postal_code) {
            res.status(422).json({ message: 'Preencha todos os campos obrigatórios' })

            return
        }

        // Check if market exists
        const cnpjExists = await Market.findOne ({ where: { cnpj: cnpj } })

        if(cnpjExists) {
            res.status(422).json({ message: 'Supermecado já cadastrado, por favor utilize um CNPJ diferente!' })

            return
        }

        // Logo upload
        if(req.file) {
            logo = req.file.filename
        }

        try {
            // Address info
            const addressInfo = await addressInfoByCEP.getAddressInfoByCEP(postal_code)

            const newStreetName = addressInfo.logadouro
            const newNeighborhood = addressInfo.bairro
            const newCity = addressInfo.localidade
            const newState = addressInfo.uf

            // Create market
            const market = new Market({
                logo,
                registered_name,
                cnpj,
                phone_number,
                open_close_monday_friday,
                open_close_saturday,
                open_close_sunday_holiday,
                postal_code,
                street_name: newStreetName,
                store_number,
                complement,
                neighborhood: newNeighborhood,
                city: newCity,
                state: newState
            })

            const newMarket = await market.save()

            await createMarketToken(newMarket, req, res)
        } catch(error) {
            res.status(500).json({ message: error })
        }
    }

    static async checkMarket(req, res){
        let currentMarket

        console.log(req.headers.autorization)

        if(req.headers.autorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'marketsecret')

            currentMarket = Market.findByPk(decoded.id)
        } else {
            currentMarket = null
        }

        res.status(200).send(currentMarket)        
    }

    static async getMarketById(req, res) {
        const id = req.parms.id

        const market = await Market.findByPk(id)

        if(!market) {
            res.status(422).json({ message: 'Supermercado não encontrado!' })

            return
        }

        res.status(200).json({ market })
    }

    static async editMarket(req, res) {
        const token = getToken(req)

        const market = await this.getMarketById(token)

        const logo = req.body.logo
        const registered_name = req.body.registered_name
        const cnpj = req.body.cnpj
        const phone_number = req.body.phone_number
        const open_close_monday_friday = req.body.open_close_monday_friday
        const open_close_saturday = req.body.open_close_saturday
        const open_close_sunday_holiday = req.body.open_close_sunday_holiday
        const postal_code = req.body.postal_code
        const store_number = req.body.store_number
        const complement = req.body.complement

        // Edit logo
        if(req.file) {
            logo = req.file.filename
        }
        market.logo = logo

        // Validate required input
        if(!registered_name || !cnpj || !phone_number || !open_close_monday_friday || !open_close_saturday || !postal_code) {
            res.status(422).json({ message: 'Preencha todos os campos obrigatórios' })

            return
        }

        // Edit registered name
        market.registered_name = registered_name

        // Check if market exists
        const cnpjExists = await Market.findOne ({ where: { cnpj: cnpj } })

        if(cnpjExists) {
            res.status(422).json({ message: 'Supermecado já cadastrado, por favor utilize um CNPJ diferente!' })

            return
        }

        // Edit CNPJ
        market.cnpj = cnpj

        // Edit phone
        market.phone_number = phone_number

        // Edit Opening hours
        market.open_close_monday_friday = open_close_monday_friday
        market.open_close_saturday = open_close_saturday
        market.open_close_sunday_holiday = open_close_sunday_holiday

        // Edit address
        // Address info
        const addressInfo = await addressInfoByCEP.getAddressInfoByCEP(postal_code)

        const newStreetName = addressInfo.logadouro
        const newNeighborhood = addressInfo.bairro
        const newCity = addressInfo.localidade
        const newState = addressInfo.uf

        market.postal_code = postal_code
        market.street_name = newStreetName
        market.store_number = store_number
        market.complement = complement
        market.neighborhood = newNeighborhood
        market.city = newCity
        market.state = newState

        try {
            // Returns updated data
            market = await Market.update()

            res.json({
                message: 'Supermercado atualizado com sucesso!',
                data: market,
            })
        } catch(error) {
            res.status(500).json({ message: error })
        }
    }

    static async deleteMarket(req, res) {
        try {
            const token = getToken(req)

            // Get market by token
            const market = await this.getMarketById(token)

            // Check if market exists
            if(!market) {
                res.status(404).json({ message: 'Supermercado não encontrado!' })

                return
            }

            // Delete market
            await market.destroy()

            // Remove market token
            delete market.token

            res.status(200).json({ message: 'Supermercado removido com sucesso!' })
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
    }
}