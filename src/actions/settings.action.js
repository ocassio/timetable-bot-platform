const DBService = require('../services/db.service')

const settingsAction = {

    name: 'settings',

    async execute({ userId }) {
        const preferences = await DBService.getPreferences(userId)
        return {
            title: 'Настройки',
            messages: [
                preferences
            ],
            buttons: [
                {
                    label: 'Выбрать критерий',
                    action: 'select-criterion'
                },
                {
                    label: 'Назад',
                    action: 'main-menu'
                }            
            ]
        }
    }
}

module.exports = settingsAction