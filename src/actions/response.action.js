const { LAST_ACTION } = require('../consts/session.consts')
const SessionService = require('../services/session.service')
const actions = require('./index')

const responseAction = {

    name: 'response',

    execute(params) {
        const actionName = SessionService.getParam(params.userId, LAST_ACTION)
        const action = require('./index').find(action => action.name === actionName)
        return action.execute(params)
    }
}

module.exports = responseAction