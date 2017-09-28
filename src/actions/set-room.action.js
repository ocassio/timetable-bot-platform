const {
    SET_ROOM_ACTION,
    SELECT_DATE_RANGE_ACTION,
    MAIN_MENU_ACTION,
    SETTINGS_ACTION
} = require('../consts/actions.consts')
const { CRITERIA_TYPES } = require('../consts/timetable.consts')
const PreferencesService = require('../services/preferences.service')

const setRoomAction = {

    name: SET_ROOM_ACTION,

    execute({ customTimetable }) {
        return {
            response: {
                messages: [
                    'Введите аудиторию'
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
            operation(userId, CRITERIA_TYPES.ROOM, value, {
                success: room => {
                    let next
                    if (customTimetable) {
                        next = {
                            action: SELECT_DATE_RANGE_ACTION,
                            criterion: {
                                type: CRITERIA_TYPES.ROOM,
                                id: room.id
                            }
                        }
                    } else {
                        next = { action: MAIN_MENU_ACTION }
                    }
                    resolve({
                        response: { messages: [`Аудитория ${room.name} успешно выбрана`] },
                        next
                    })
                },
                notFound: () => {
                    resolve({
                        response: { messages: [`Аудитория ${value} не найдена`] },
                        next: { action: SET_ROOM_ACTION, customTimetable }
                    })
                },
                ambiguous: groups => {
                    let message = 'Найдено несколько подходящих аудиторий:\n'
                    groups.forEach(g => message += g + '\n')
                    resolve({
                        response: { messages: [message] },
                        next: { action: SET_ROOM_ACTION, customTimetable }
                    })
                }
            })
        })
    }
}

module.exports = setRoomAction