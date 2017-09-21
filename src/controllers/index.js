const { Router } = require('express')

const APIControllers = require('./api')

const router = Router()

// Uncomment to enable REST API
// router.use('/api', APIControllers)

module.exports = router