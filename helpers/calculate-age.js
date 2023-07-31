const { parse, differenceInYears, format } = require('date-fns')

function takeAge(birth_date) {
    const birthDate = parse(birth_date, 'dd/MM/yyyy', new Date())
    const currentDate = new Date()
    const newAge = differenceInYears(currentDate, birthDate)
    return newAge
}

try {
    //Format birth_dat to ISO 8601
    const formatteBirthDate = format(parse(birth_date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
} catch {

}

module.exports = { takeAge }