const { LAST_ACTION } = require('../consts/session.consts')
const SessionService = require('../services/session.service')

function textAction({ userId }) {
    return SessionService.getParam(userId, LAST_ACTION)
}

module.exports = textAction