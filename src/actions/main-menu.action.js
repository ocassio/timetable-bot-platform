const mainMenuAction = {

    name: 'main-menu',

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
                    action: 'settings'
                }
            ]
        }
    }
}

module.exports = mainMenuAction