const moment = require('moment')

module.exports = {
    formatDate:(inputDate) => {
        return moment(inputDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }
}