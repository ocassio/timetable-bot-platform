const request = require('request')
const { apiUrl } = require('../configs/platform.config')

const TIMETABLE_URL = `${apiUrl}/timetable`
const CRITERIA_URL = `${apiUrl}/criteria`

class APIService {

    static getCriteria(criteriaType) {
        return new Promise((resolve, reject) => {
            const url = CRITERIA_URL + '/' + encodeURIComponent(criteriaType)
            request(url, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject()
                }
            })
        })
    }

    static getTimetable(criteriaType, criterion, from, to) {
        return new Promise((resolve, reject) => {
            const params = {
                url: TIMETABLE_URL,
                qs: {
                    criteriaType: criteriaType,
                    criterion: criterion,
                    from: from,
                    to: to
                }
            }
            request(params, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject()
                }
            })
        })
    }

}

module.exports = APIService