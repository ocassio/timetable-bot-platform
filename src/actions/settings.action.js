const DBService = require('../services/db.service')
const mainMenuAction = require('./main-menu.action')
const selectCriterionAction = require('./select-criterion.action')

const settingsAction = {

    name: 'settings',

    async execute({ userId }) {
        // const preferences = await DBService.getPreferences(userId)
        return {
            title: 'Настройки',
            messages: [
                // preferences
            ],
            buttons: [
                {
                    label: 'Выбрать критерий',
                    action: selectCriterionAction.name
                },
                {
                    label: 'Назад',
                    action: mainMenuAction.name
                }            
            ]
        }
    }
}

module.exports = settingsAction