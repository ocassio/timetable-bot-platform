const express = require('express')
const { Server } = require('http')
const socketIO = require('socket.io')

const controllers = require('./controllers')
const sockets = require('./sockets')

const port = process.env.PORT || 3000

const app = express()
const server = Server(app)

const io = socketIO(server)
sockets(io)

app.use(controllers)

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})