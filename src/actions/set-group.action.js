const { SET_GROUP_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')

const setGroupAction = {

    name: 'setGroup',

    execute() {
        return {
            messages: [
                'Введите группу'
            ]
        }
    },

    handleResponse({ userId, value }) {
        //TODO: implement actual logic
        return {
            messages: [
                `Группа ${value} успешно выбрана`
            ],
            next: {
                action: MAIN_MENU_ACTION
            }
        }
    }
}

module.exports = setGroupAction