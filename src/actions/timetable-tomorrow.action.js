const { TIMETABLE_TOMORROW_ACTION, TIMETABLE_ACTION } = require('../consts/actions.consts')
const DateUtils = require('../utils/date.utils')

const timetableTomorrowAction = {
    
    name: TIMETABLE_TOMORROW_ACTION,

    execute({ criterion }) {
        return {
            next: {
                action: TIMETABLE_ACTION,
                dateRange: DateUtils.getTomorrowRange(),
                criterion
            }
        }
    }

}

module.exports = timetableTomorrowAction