const {
    SET_GROUP_ACTION,
    SELECT_DATE_RANGE_ACTION,
    MAIN_MENU_ACTION,
    SETTINGS_ACTION
} = require('../consts/actions.consts')
const { CRITERIA_TYPES } = require('../consts/timetable.consts')
const PreferencesService = require('../services/preferences.service')

const setGroupAction = {

    name: SET_GROUP_ACTION,

    execute({ customTimetable }) {
        return {
            response: {
                messages: [
                    'Введите группу'
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
            operation(userId, CRITERIA_TYPES.GROUP, value, {
                success: group => {
                    let next
                    if (customTimetable) {
                        next = {
                            action: SELECT_DATE_RANGE_ACTION,
                            criterion: {
                                type: CRITERIA_TYPES.GROUP,
                                id: group.id
                            }
                        }
                    } else {
                        next = { action: MAIN_MENU_ACTION }
                    }
                    resolve({
                        response: { messages: [`Группа ${group.name} успешно выбрана`] },
                        next
                    })
                },
                notFound: () => {
                    resolve({
                        response: { messages: [`Группа ${value} не найдена`] },
                        next: { action: SET_GROUP_ACTION, customTimetable }
                    })
                },
                ambiguous: groups => {
                    let message = 'Найдено несколько подходящих групп:\n'
                    groups.forEach(g => message += g + '\n')
                    resolve({
                        response: { messages: [message] },
                        next: { action: SET_GROUP_ACTION, customTimetable }
                    })
                }
            })
        })
    }
}

module.exports = setGroupAction