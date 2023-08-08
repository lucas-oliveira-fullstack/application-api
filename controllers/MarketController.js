const bcrypt = require('bcrypt')
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
            fantasy_name,
            cnpj,
            phone_number,
            cell_number,
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

            const newStreetName = addressInfo.logradouro
            const newNeighborhood = addressInfo.bairro
            const newCity = addressInfo.localidade
            const newState = addressInfo.uf

            // Create market
            const market = {
                logo,
                registered_name,
                fantasy_name,
                cnpj,
                phone_number,
                cell_number,
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
            }

            await Market.create(market)

            res.status(200).json({ message: 'Supermerdado criado com sucesso', market })
        } catch(error) {
            res.status(500).json({ message: error })
        }
    }

    static async getMarketById(req, res) {
        const id = req.params.id
        
        try {
            const market = await Market.findByPk(id)

            if(!market) {
                res.status(422).json({ message: 'Supermercado não encontrado!' })

                return
            }

            res.status(200).json({ market })
        } catch(error) {
            res.status(500).json({ message: error })
        }
    }

    static async edit(req, res) {
        const id = req.params.id

        try{
            // Get market by id
            const market = await Market.findByPk(id)

            // Check if market exists
            if(!market) {
                res.status(422).json({ message: 'Supermercado não encontrado!' })

                return
            }

            const {
                fantasy_name,
                phone_number,
                cell_number,
                open_close_monday_friday,
                open_close_saturday,
                open_close_sunday_holiday,
                postal_code,
                store_number,
                complement
            } = req.body

            if(fantasy_name) {
                market.fantasy_name = fantasy_name
            }

            if(phone_number) {
                market.phone_number = phone_number
            }

            if(fantasy_name) {
                market.cell_number = cell_number
            }

            if(open_close_monday_friday) {
                market.open_close_monday_friday = open_close_monday_friday
            }

            if(open_close_saturday) {
                market.open_close_saturday = open_close_saturday
            }

            if(open_close_sunday_holiday) {
                market.open_close_sunday_holiday = open_close_sunday_holiday
            }

            if(postal_code) {
                try {
                    // Address info by CEP
                    const addressInfo = await addressInfoByCEP.getAddressInfoByCEP(postal_code)
                    const newStreetName = addressInfo.logradouro
                    const newNeighborhood = addressInfo.bairro
                    const newCity = addressInfo.localidade
                    const newState = addressInfo.uf

                    market.street_name = newStreetName
                    market.neighborhood = newNeighborhood
                    market.city = newCity
                    market.state = newState
                } catch(error) {
                    res.status(422).json({ message: 'Não foi possivel receber as informação do endereço', error })
                }
            }

            if(store_number) {
                market.store_number = store_number
            }

            if(complement) {
                market.complement = complement
            }

            await market.save()

            res.status(200).json({ message: 'Supermercado atualizado com sucesso' })
        } catch(error) {
            res.status(500).json({ message: 'Erro ao atualizar usuário!' })
        }
    }

    static async delete(req, res) {
        const id = req.params.id

        try {
            // Get market by id
            const market = await Market.findByPk(id)

            // Check if market exists
            if(!market) {
                res.status(422).json({ message: 'Supermercado não encontrado!' })

                return
            }

            await market.destroy()

            res.status(200).json({ message: 'Supermercado removido com sucesso' })
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
    }
}