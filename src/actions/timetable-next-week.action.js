const { TIMETABLE_NEXT_WEEK_ACTION, TIMETABLE_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableNextWeekAction = {
    
    name: TIMETABLE_NEXT_WEEK_ACTION,

    execute({ criterion }) {
        return {
            next: {
                action: TIMETABLE_ACTION,
                dateRange: DateUtils.getNextWeek(),
                criterion
            }
        }
    }

}

module.exports = timetableNextWeekAction