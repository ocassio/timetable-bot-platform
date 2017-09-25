const { ERROR_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')

const errorAction = {

    name: ERROR_ACTION,

    execute() {
        return {
            response: {
                messages: [
                    'Упс... Кажется что-то пошло не так. :('
                ],
            },
            next: {
                action: MAIN_MENU_ACTION
            }
        }
    }
}

module.exports = errorAction