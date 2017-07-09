const DBService = require('../services/db.service')

async function settingsAction({userId}) {
    const preferences = await DBService.getPreferences(userId)
    return {
        title: 'Настройки',
        message: preferences,
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

module.exports = settingsAction