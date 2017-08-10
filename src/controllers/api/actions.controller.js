const { Router } = require('express')

const actions = require('../../actions')

const router = Router()

for (let [name, action] of actions) {
    router.get(`/${name}`, (request, response) => dispatch(request, response, action))
}

async function dispatch(request, response, action) {
    const params = Object.assign({}, request.query, request.params)
    try {
        let result = action(params)
        if (result instanceof Promise) {
            result = await result
        }
        response.send(result)
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