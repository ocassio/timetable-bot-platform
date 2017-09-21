const sendMessage = require('./send-message.emitter')
const errorAction = require('../../actions/error.action')

function sendErrorMessage(socket, userId) {
    const message = errorAction.execute()
    message.recipients = [userId]
    sendMessage(socket, message)
    if (message.next) {
        const actionHandler = require('../handlers/action.handler')
        message.next.userId = userId
        actionHandler.handle(socket, message.next)
    }
}

module.exports = sendErrorMessage