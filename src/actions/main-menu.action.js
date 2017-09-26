const { 
    MAIN_MENU_ACTION,
    SELECT_DATE_RANGE_ACTION,
    SETTINGS_ACTION
} = require('../consts/actions.consts')

const mainMenuAction = {

    name: MAIN_MENU_ACTION,

    execute() {
        return {
            response: {
                messages: [
                    'Главное меню'
                ],
                buttons: [
                    {
                        label: 'Расписание',
                        action: SELECT_DATE_RANGE_ACTION
                    },
                    {
                        label: 'Расписание по критерию',
                        action: 'timetableCustom'
                    },
                    {
                        label: 'Настройки',
                        action: SETTINGS_ACTION
                    }
                ]
            }
        }
    }
}

module.exports = mainMenuAction