const { TIMETABLE_SEVEN_DAYS_ACTION, TIMETABLE_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableSevenDaysAction = {
    
    name: TIMETABLE_SEVEN_DAYS_ACTION,

    execute({ criterion }) {
        return {
            next: {
                action: TIMETABLE_ACTION,
                dateRange: DateUtils.getSevenDays(),
                criterion
            }
        }
    }

}

module.exports = timetableSevenDaysAction