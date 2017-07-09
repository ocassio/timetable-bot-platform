const { Router } = require('express')

const APIControllers = require('./api')

const router = Router()

router.use('/api', APIControllers)

module.exports = router