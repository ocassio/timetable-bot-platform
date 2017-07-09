const { Router } = require('express')

const ActionsController = require('./actions.controller')

const router = Router()

router.use('/actions', ActionsController)

module.exports = router