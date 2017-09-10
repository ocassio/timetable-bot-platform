const handlers = require('./handlers')

function sockets(io) {

    io.on('connection', socket => {
        handlers.forEach(handler => {
            socket.on(handler.name, params => {
                handler.handle(socket, params)
            })
        })
    })

}

module.exports = sockets