const { LAST_ACTION } = require('../consts/session.consts')
const { RESPONSE_ACTION } = require('../consts/actions.consts')
const SessionService = require('../services/session.service')

const responseAction = {

    name: RESPONSE_ACTION,

    execute(params) {
        const actionName = SessionService.getParam(params.userId, LAST_ACTION)
        const action = require('./index').find(action => action.name === actionName)
        if (action && action.handleResponse) {
            return action.handleResponse(params)
        }
    }
}

module.exports = responseAction