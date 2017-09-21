const { SETTINGS_ACTION, SELECT_CRITERION_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')
const DBService = require('../services/db.service')

const settingsAction = {

    name: SETTINGS_ACTION,

    async execute({ userId }) {
        return {
            title: 'Настройки',
            messages: [
                'Настройки'
            ],
            buttons: [
                {
                    label: 'Выбрать критерий',
                    action: SELECT_CRITERION_ACTION
                },
                {
                    label: 'Назад',
                    action: MAIN_MENU_ACTION
                }            
            ]
        }
    }
}

module.exports = settingsAction