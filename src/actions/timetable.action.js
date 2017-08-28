const timetableAction = {
    name: 'timetable',

    execute({ userId }) {
        return {
            message: 'Расписание'
        }
    }
}

module.exports = timetableAction