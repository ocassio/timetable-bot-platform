const { ACTION_HANDLER } = require('../../consts/handlers.consts')
const actions = require('../../actions')
const sendMessage = require('../emitters/send-message.emitter')

const actionsMap = {}
actions.forEach(action => actionsMap[action.name] = action)

const actionHandler = {

    name: ACTION_HANDLER,

    handle(socket, params) {
        console.log(`Action: ${params.action}`)
        console.log(`Params: ${JSON.stringify(params)}`)
        try {
            let result = actionsMap[params.action].execute(params)
            if (result instanceof Promise) {
                result = await result
            }
            console.log(`Result: ${JSON.stringify(result)}`)
            sendMessage(result)
        } catch(e) {
            console.error(e)
        }
    }
}

module.exports = actionHandler