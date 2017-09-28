const {
    SET_TEACHER_ACTION,
    SELECT_DATE_RANGE_ACTION,
    MAIN_MENU_ACTION,
    SETTINGS_ACTION
} = require('../consts/actions.consts')
const { CRITERIA_TYPES } = require('../consts/timetable.consts')
const PreferencesService = require('../services/preferences.service')

const setTeacherAction = {

    name: SET_TEACHER_ACTION,

    execute({ customTimetable }) {
        return {
            response: {
                messages: [
                    'Введите преподавателя'
                ],
                buttons: [
                    {
                        label: 'Отмена',
                        action: SETTINGS_ACTION
                    }
                ]
            },
            sessionData: { customTimetable }
        }
    },

    async handleResponse({ userId, value, customTimetable }) {
        return new Promise(resolve => {
            const operation = customTimetable ? PreferencesService.checkCriterion : PreferencesService.setCriterion
            operation(userId, CRITERIA_TYPES.TEACHER, value, {
                success: teacher => {
                    let next
                    if (customTimetable) {
                        next = {
                            action: SELECT_DATE_RANGE_ACTION,
                            criterion: {
                                type: CRITERIA_TYPES.TEACHER,
                                id: teacher.id
                            }
                        }
                    } else {
                        next = { action: MAIN_MENU_ACTION }
                    }
                    resolve({
                        response: { messages: [`Преподаватель ${teacher.name} успешно выбран`] },
                        next
                    })
                },
                notFound: () => {
                    resolve({
                        response: { messages: [`Преподаватель ${value} не найден`] },
                        next: { action: SET_TEACHER_ACTION, customTimetable }
                    })
                },
                ambiguous: groups => {
                    let message = 'Найдено несколько подходящих преподавателей:\n'
                    groups.forEach(g => message += g + '\n')
                    resolve({
                        response: { messages: [message] },
                        next: { action: SET_TEACHER_ACTION, customTimetable }
                    })
                }
            })
        })
    }
}

module.exports = setTeacherAction