const { ACTION_HANDLER } = require('../../consts/handlers.consts')
const actions = require('../../actions')
const sendMessage = require('../emitters/send-message.emitter')

const actionsMap = {}
actions.forEach(action => actionsMap[action.name] = action)

const actionHandler = {

    name: ACTION_HANDLER,

    async handle(socket, params) {
        console.log(`Action: ${params.action}`)
        console.log(`Params: ${JSON.stringify(params)}`)
        try {
            let result = actionsMap[params.action].execute(params)
            if (result instanceof Promise) {
                result = await result
            }
            result.recipients = [params.userId]
            console.log(`Result: ${JSON.stringify(result)}`)
            sendMessage(result)

            if (result.next) {
                result.next.userId = params.userId
                this.handle(socket, result.next)
            }
        } catch(e) {
            console.error(e)
        }
    }
}

module.exports = actionHandler