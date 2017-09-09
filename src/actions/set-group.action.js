const mainMenuAction = require('./main-menu.action')

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
                action: mainMenuAction.name
            }
        }
    }
}

module.exports = setGroupAction