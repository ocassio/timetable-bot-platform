const express = require('express')
const controllers = require('./controllers')

const port = process.env.PORT || 3000

const app = express()

app.use(controllers)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})