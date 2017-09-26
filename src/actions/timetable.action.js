const { TIMETABLE_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')
const { LAST_ACTION } = require('../consts/session.consts')
const SessionService = require('../services/session.service')
const PreferencesService = require('../services/preferences.service')
const APIService = require('../services/api.service')
const DateUtils = require('../utils/date.utils')

const timetableAction = {
    
    name: TIMETABLE_ACTION,

    async execute({ userId }) {
        const lastAction = SessionService.getParam(userId, LAST_ACTION)
        const action = require('../actions').find(action => action.name === lastAction)
        const dateRange = action.getDateRange(userId)
        const criterion = await PreferencesService.getCriterion(userId)
        const timetable = await APIService.getTimetable(criterion.type, criterion.id, dateRange.from, dateRange.to)
        const messages = timetable.length > 0 ?
            timetable.map(day => this.getDayMessage(day)) :
            ['Пары отсутствуют']

        return {
            response: {
                messages: messages
            },
            next: {
                action: MAIN_MENU_ACTION
            }
        }
    },

    getDayMessage(day) {
        let message = `${day.dayOfWeek} - ${day.date}\n`
        day.lessons.forEach(lesson => message += '\n' + this.getLessonMessage(lesson))

        return message;
    },

    getLessonMessage(lesson) {
        let message = `${lesson.number} пара | ${lesson.time.from} - ${lesson.time.to}\n`
        message += `${lesson.name}\n`
        message += `Преподаватель: ${this.getValue(lesson.teacher)}\n`
        message += `Аудитория: ${this.getValue(lesson.room)}\n`
        message += `Вид занятия: ${this.getValue(lesson.type)}\n`
        message += `Группы: ${this.getValue(lesson.group)}\n`
        message += `Примечание: ${this.getValue(lesson.note)}\n`

        return message;
    },

    getValue(value) {
        return value ? value : '-'
    }
}

module.exports = timetableAction