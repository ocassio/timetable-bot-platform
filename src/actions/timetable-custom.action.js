const { TIMETABLE_CUSTOM_ACTION, TIMETABLE_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableCustomAction = {
    
    name: TIMETABLE_CUSTOM_ACTION,

    execute() {
        return {
            response: {
                messages: ['Введите временной диапазон'],
                buttons: [
                    {
                        label: 'Отмена',
                        action: MAIN_MENU_ACTION
                    }
                ]
            }
        }
    },

    handleResponse({ userId, value }) {
        const dateRange = DateUtils.getDateRange(value)
        if (dateRange) {
            return {
                next: {
                     action: TIMETABLE_ACTION,
                     dateRange
                }
            }
        }
        
        return {
            response: {
                messages: ['Пожалуйста, укажите дату в формате дд.мм.гггг']
            },
            next: { action: TIMETABLE_CUSTOM_ACTION }
        }
    }

}

module.exports = timetableCustomAction