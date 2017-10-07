const intel = require('intel')

const { ACTION_HANDLER } = require('../../consts/handlers.consts')
const { LAST_ACTION } = require('../../consts/session.consts')

const SessionService = require('../../services/session.service')
const actions = require('../../actions')
const sendMessage = require('../emitters/send-message.emitter')
const sendErrorMessage = require('../emitters/send-error-message.emitter')

const actionsMap = {}
actions.forEach(action => actionsMap[action.name] = action)

const actionHandler = {

    name: ACTION_HANDLER,

    async handle(socket, params) {
        const { userId, action } = params
        intel.debug(`Action: ${action}`)
        intel.debug(`Params: ${JSON.stringify(params)}`)

        try {
            userId.doSomething()
            const actionObject = actionsMap[action]
            let result = actionObject.execute(params)
            if (result instanceof Promise) {
                result = await result
            }
            intel.debug(`Result: ${JSON.stringify(result)}`)

            if (result.response) {
                result.response.recipients = result.response.recipients || [userId]
                sendMessage(socket, result.response)
            }

            if (!actionObject.hidden) {
                const actionInfo = result.sessionData || {}
                actionInfo.action = action
                SessionService.setParam(userId, LAST_ACTION, actionInfo)
            }

            if (result.next) {
                result.next.userId = userId
                this.handle(socket, result.next)
            }
        } catch (e) {
            intel.error(`Action: ${action}`)
            intel.error(`Params: ${JSON.stringify(params)}`)
            intel.error(e)
            sendErrorMessage(socket, userId)
        }
    }
}

module.exports = actionHandler