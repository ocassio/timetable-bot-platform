const express = require('express')
const { Server } = require('http')
const socketIO = require('socket.io')
const intel = require('intel')

const { port } = require('./configs/platform.config')
const loggingConfig = require('./configs/logging.config')
const controllers = require('./controllers')
const sockets = require('./sockets')

intel.basicConfig(loggingConfig)

const app = express()
const server = Server(app)

const io = socketIO(server)
sockets(io)

app.use(controllers)

server.listen(port, () => {
    intel.info(`Listening on port ${port}`)
})