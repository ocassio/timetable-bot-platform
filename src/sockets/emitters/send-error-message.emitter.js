const sendMessage = require('./send-message.emitter')
const errorAction = require('../../actions/error.action')

function sendErrorMessage(socket) {
    sendMessage(errorAction, errorAction.execute())
}

module.exports = sendErrorMessage