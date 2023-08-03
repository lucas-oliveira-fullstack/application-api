const Market = require('../models/Market')

// Helpers
const addressInfoByCEP = require('../helpers/take-address-info')
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
        } catch(error) {
            res.status(500).json({ message: error })
        }
    }
}