const { TIMETABLE_CUSTOM_ACTION, TIMETABLE_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')
const { CUSTOM_DATE_RANGE } = require('../consts/session.consts')
const SessionService = require('../services/session.service')
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
            SessionService.setParam(userId, CUSTOM_DATE_RANGE, dateRange)
            return { next: { action: TIMETABLE_ACTION } }
        }
        
        return {
            response: {
                messages: ['Пожалуйста, укажите дату в формате дд.мм.гггг']
            },
            next: { action: TIMETABLE_CUSTOM_ACTION }
        }
    },
    
    getDateRange(userId) {
        return SessionService.getParam(userId, CUSTOM_DATE_RANGE)
    }

}

module.exports = timetableCustomAction