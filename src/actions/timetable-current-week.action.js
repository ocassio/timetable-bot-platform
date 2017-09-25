const { TIMETABLE_CURRENT_WEEK_ACTION, TIMETABLE_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableCurrentWeekAction = {
    
    name: TIMETABLE_CURRENT_WEEK_ACTION,

    execute() {
        return {
            next: {
                action: TIMETABLE_ACTION
            }
        }
    },

    getDateRange() {
        return DateUtils.getCurrentWeek();
    }

}

module.exports = timetableCurrentWeekAction