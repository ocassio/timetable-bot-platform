const { TIMETABLE_CUSTOM_ACTION, TIMETABLE_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableCustomAction = {
    
    name: TIMETABLE_CUSTOM_ACTION,

    execute() {
        return {
            response: {
                messages: ['Введите временной диапазон']
            }
        }
    },

    handleResponse({ userId, value }) {
        const dateRange = DateUtils.getDateRange(value)
        //TODO: set date range somewhere
        return {
            next: {
                action: TIMETABLE_ACTION
            }
        }
    },
    
    getDateRange() {
        //TODO: get previously saved date range
    }

}

module.exports = timetableCustomAction