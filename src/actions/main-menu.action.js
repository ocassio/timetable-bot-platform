function mainMenuAction() {
    return {
        title: 'Главное меню',
        message: 'Выберите желаемое действие',
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

module.exports = mainMenuAction