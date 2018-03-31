const intel = require('intel')
const handlers = require('./handlers')

function sockets(io) {

    io.on('connect', socket => {
        const clientName = socket.handshake.query.name
        intel.info(`${clientName} client successfully connected`)

        const settings = {
            shortMessages: socket.handshake.query.shortMessages === 'true'
        }
        
        handlers.forEach(handler => {
            socket.on(handler.name, params => {
                handler.handle(socket, {
                    ...params,
                    settings
                })
            })
        })

        socket.on('disconnect', () => {
            intel.info(`${clientName} client connection has been dropped`)
        })
    })

}

module.exports = sockets