const axios = require('axios')

// Take address info by CEP
async function getAddressInfoByCEP(postal_code) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${postal_code}/json/`)
        return response.data
    } catch (error) {
        throw new Error('Erro ao obter informações do endereço a partir do CEP')
    }
}

module.exports = { getAddressInfoByCEP }