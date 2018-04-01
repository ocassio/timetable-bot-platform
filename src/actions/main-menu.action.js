const { 
    MAIN_MENU_ACTION,
    SELECT_DATE_RANGE_ACTION,
    SELECT_CRITERION_ACTION,
    SETTINGS_ACTION,
    BROADCAST_ACTION
} = require('../consts/actions.consts')
const UserService = require('../services/user.service')

const mainMenuAction = {

    name: MAIN_MENU_ACTION,

    execute({ userId }) {
        const buttons = [
            {
                label: 'Мое расписание',
                action: SELECT_DATE_RANGE_ACTION
            },
            {
                label: 'Расписание',
                action: SELECT_CRITERION_ACTION,
                params: {
                    customTimetable: true
                }
            },
            {
                label: 'Настройки',
                action: SETTINGS_ACTION
            }
        ]

        if (UserService.isAdmin(userId)) {
            buttons.push({
                label: 'Отправить сообщение',
                action: BROADCAST_ACTION
            })
        }

        return {
            response: {
                messages: [
                    'Главное меню'
                ],
                buttons
            }
        }
    }
}

module.exports = mainMenuAction