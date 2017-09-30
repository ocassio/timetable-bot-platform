const { LAST_ACTION } = require('../consts/session.consts')
const { RESPONSE_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')
const SessionService = require('../services/session.service')

const responseAction = {

    name: RESPONSE_ACTION,
    hidden: true,

    execute(params) {
        const lastAction = SessionService.getParam(params.userId, LAST_ACTION)
        if (lastAction) {
            const action = require('./index').find(action => action.name === lastAction.action)
            const mergedParams = Object.assign({}, params, lastAction)
            if (action && action.handleResponse) {
                return action.handleResponse(mergedParams)
            }
        }

        return {
            next: { action: MAIN_MENU_ACTION }
        }
    },
}

module.exports = responseAction