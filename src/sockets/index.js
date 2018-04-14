const intel = require('intel')
const auth = require('socketio-auth')
const handlers = require('./handlers')
const { tokens } = require('../configs/platform.config')

function sockets(io) {

    auth(io, {
        authenticate: (socket, { token }, callback) => callback(null, tokens.includes(token))
    })

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