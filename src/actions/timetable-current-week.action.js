const { TIMETABLE_CURRENT_WEEK_ACTION, TIMETABLE_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableCurrentWeekAction = {
    
    name: TIMETABLE_CURRENT_WEEK_ACTION,

    execute({ criterion }) {
        return {
            next: {
                action: TIMETABLE_ACTION,
                dateRange: DateUtils.getCurrentWeek(),
                criterion
            }
        }
    }

}

module.exports = timetableCurrentWeekAction