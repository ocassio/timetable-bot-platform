const settingsAction = require('./settings.action')

const mainMenuAction = {

    name: 'mainMenu',

    execute() {
        return {
            title: 'Главное меню',
            messages: [
                'Выберите желаемое действие'
            ],
            buttons: [
                {
                    label: 'Расписание на сегодня',
                    action: 'timetable/today'
                },
                {
                    label: 'Расписание на завтра',
                    action: 'timetable/tomorrow'
                },
                {
                    label: 'Настройки',
                    action: settingsAction.name
                }
            ]
        }
    }
}

module.exports = mainMenuAction