function sendMessage(socket, message) {
    socket.emit('sendMessage', message)
}

module.exports = sendMessage