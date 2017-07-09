const { Router } = require('express')

const mainMenuAction  = require('../../actions/main-menu.action')
const settingsAction  = require('../../actions/settings.action')
const timetableAction = require('../../actions/timetable.action')

const router = Router()

router.get('/main-menu', (request, response) => dispatch(request, response, mainMenuAction))
router.get('/settings',  (request, response) => dispatch(request, response, settingsAction))
router.get('/timetable', (request, response) => dispatch(request, response, timetableAction))

async function dispatch(request, response, action) {
    try {
        const params = Object.assign({}, request.query, request.params)
        let result = action(params)
        if (result instanceof Promise) {
            result = await result
        }
        response.send(result)
    } catch (e) {
        response.send(500, 'Oops, something went wrong')
    }
}

module.exports = router