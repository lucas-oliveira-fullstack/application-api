const moment = require('moment')

module.exports = {
    calculateAge: (birth_date) => {
        const today = moment()
        const birthDateMoment = (birth_date)
        const age = today.diff(birthDateMoment, 'years')

        return age
    }
}