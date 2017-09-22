const { SET_TEACHER_ACTION, MAIN_MENU_ACTION, SETTINGS_ACTION } = require('../consts/actions.consts')
const { CRITERIA_TYPES } = require('../consts/timetable.consts')
const PreferencesService = require('../services/preferences.service')

const setTeacherAction = {

    name: SET_TEACHER_ACTION,

    execute() {
        return {
            messages: [
                'Введите преподавателя'
            ],
            buttons: [
                {
                    label: 'Отмена',
                    action: SETTINGS_ACTION
                }
            ]
        }
    },

    async handleResponse({ userId, value }) {
        return new Promise(resolve => {
            PreferencesService.setCriterion(userId, CRITERIA_TYPES.TEACHER, value, {
                success: teacher => {
                    resolve({
                        messages: [`Преподаватель ${teacher} успешно выбран`],
                        next: { action: MAIN_MENU_ACTION }
                    })
                },
                notFound: () => {
                    resolve({
                        messages: [`Преподаватель ${value} не найден`],
                        next: { action: SET_TEACHER_ACTION }
                    })
                },
                ambiguous: groups => {
                    let message = 'Найдено несколько подходящих преподавателей:\n';
                    groups.forEach(g => message += g + '\n');
                    resolve({
                        messages: [message],
                        next: { action: SET_TEACHER_ACTION }
                    })
                }
            })
        })
    }
}

module.exports = setTeacherAction