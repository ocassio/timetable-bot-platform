const { MAIN_MENU_ACTION, SETTINGS_ACTION } = require('../consts/actions.consts')

const mainMenuAction = {

    name: 'mainMenu',

    execute() {
        return {
            title: MAIN_MENU_ACTION,
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
                    action: SETTINGS_ACTION
                }
            ]
        }
    }
}

module.exports = mainMenuAction