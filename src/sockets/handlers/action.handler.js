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
        console.log(`Action: ${action}`)
        console.log(`Params: ${JSON.stringify(params)}`)

        try {
            let result = actionsMap[action].execute(params)
            if (result instanceof Promise) {
                result = await result
            }
            result.recipients = [userId]
            console.log(`Result: ${JSON.stringify(result)}`)
            sendMessage(socket, result)
            SessionService.setParam(userId, LAST_ACTION, action)

            if (result.next) {
                result.next.userId = userId
                this.handle(socket, result.next)
            }
        } catch(e) {
            console.error(e)
            sendErrorMessage(socket, userId)
        }
    }
}

module.exports = actionHandler