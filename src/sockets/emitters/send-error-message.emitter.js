const sendMessage = require('./send-message.emitter')

function sendErrorMessage(socket) {
    sendMessage({
        messages: [
            'Упс... Кажется что-то пошло не так. :('
        ]
    })
}

module.exports = sendErrorMessage