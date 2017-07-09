const request = require('request')

const TIMETABLE_URL = process.env.TIMETABLE_API_SERVER + '/timetable'
const CRITERIA_URL = process.env.TIMETABLE_API_SERVER + '/criteria'

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