const { TIMETABLE_TODAY_ACTION, TIMETABLE_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableTodayAction = {
    
    name: TIMETABLE_TODAY_ACTION,

    execute() {
        return {
            next: {
                action: TIMETABLE_ACTION,
                dateRange: DateUtils.getTodayRange()
            }
        }
    }

}

module.exports = timetableTodayAction