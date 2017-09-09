const { TIMETABLE_ACTION } = require('../consts/actions.consts')

const timetableAction = {
    
    name: TIMETABLE_ACTION,

    execute({ userId }) {
        return {
            messages: [
                'Расписание'
            ]
        }
    }
}

module.exports = timetableAction