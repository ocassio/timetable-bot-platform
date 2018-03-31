const { TIMETABLE_ACTION, SELECT_CRITERION_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')
const PreferencesService = require('../services/preferences.service')
const APIService = require('../services/api.service')
const DateUtils = require('../utils/date.utils')

const timetableAction = {
    
    name: TIMETABLE_ACTION,

    async execute({ userId, dateRange, criterion: preselectedCriterion, settings }) {
        const criterion = preselectedCriterion || await PreferencesService.getCriterion(userId)
        if (!criterion) {
            return {
                response: {
                    messages: ['Кажется, Вы еще не выбрали группу, преподавателя или аудиторию...']
                },
                next: { action: SELECT_CRITERION_ACTION }
            }
        }

        const timetable = await APIService.getTimetable(criterion.type, criterion.id, dateRange.from, dateRange.to)
        const messages = timetable.length > 0 ?
            [].concat.apply([],
                timetable.map(day => this.getDayMessages(day, settings.shortMessages))) :
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

    getDayMessages(day, shortMessages) {
        const messages = []
        
        const date = `${day.dayOfWeek} - ${day.date}`

        if (shortMessages) {
            messages.push(date)
            day.lessons.forEach(lesson => messages.push(this.getLessonMessage(lesson)))
        } else {
            let message = `${date}\n`
            day.lessons.forEach(lesson => message += '\n' + this.getLessonMessage(lesson))
            messages.push(message)
        }

        return messages
    },

    getLessonMessage(lesson) {
        let message = `${lesson.number} пара | ${lesson.time.from} - ${lesson.time.to}\n`
        message += `${lesson.name}\n`
        message += `Преподаватель: ${this.getValue(lesson.teacher)}\n`
        message += `Аудитория: ${this.getValue(lesson.room)}\n`
        message += `Вид занятия: ${this.getValue(lesson.type)}\n`
        message += `Группы: ${this.getValue(lesson.group)}\n`
        message += `Примечание: ${this.getValue(lesson.note)}\n`

        return message
    },

    getValue(value) {
        return value ? value : '-'
    }
}

module.exports = timetableAction