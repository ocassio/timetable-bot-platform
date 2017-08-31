const timetableAction = {
    name: 'timetable',

    execute({ userId }) {
        return {
            messages: [
                'Расписание'
            ]
        }
    }
}

module.exports = timetableAction