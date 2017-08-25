const { Router } = require('express')

const actions = require('../../actions')
const SessionService = require('../../services/session.service')
const { LAST_ACTION } = require('../../consts/session.consts')

const router = Router()

for (let [name, action] of actions) {
    router.get(`/${name}`, (request, response) => dispatch(request, response, action))
}

async function dispatch(request, response, action) {
    console.log(`URL: ${request.originalUrl}`)
    const params = Object.assign({}, request.query, request.params)
    console.log(`Params: ${JSON.stringify(params)}`)
    try {
        let result = action(params)
        if (result instanceof Promise) {
            result = await result
        }
        console.log(`Result: ${JSON.stringify(result)}`)
        response.send(result)
        SessionService.setParam(params.userId, LAST_ACTION, action);
    } catch (e) {
        console.error(
            'Error executing:\n',
            `Request: ${request.originalUrl}\n`,
            `Params: ${JSON.stringify(params)}\n`,
            e)
        response.send(500, 'Oops, something went wrong')
    }
}

module.exports = router