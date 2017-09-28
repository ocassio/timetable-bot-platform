const { TIMETABLE_TODAY_ACTION, TIMETABLE_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableTodayAction = {
    
    name: TIMETABLE_TODAY_ACTION,

    execute({ criterion }) {
        return {
            next: {
                action: TIMETABLE_ACTION,
                dateRange: DateUtils.getTodayRange(),
                criterion
            }
        }
    }

}

module.exports = timetableTodayAction