function sendMessage(socket, message) {
    socket.emit('message', message)
}

module.exports = sendMessage