const { LAST_ACTION } = require('../consts/session.consts')
const SessionService = require('../services/session.service')

const responseAction = {

    name: 'response',

    execute({ userId }) {
        return {
            messages: [
                SessionService.getParam(userId, LAST_ACTION)
            ]
        }
    }
}

module.exports = responseAction