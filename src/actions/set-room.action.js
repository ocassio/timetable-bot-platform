const { SET_ROOM_ACTION, MAIN_MENU_ACTION, SETTINGS_ACTION } = require('../consts/actions.consts')
const { CRITERIA_TYPES } = require('../consts/timetable.consts')
const PreferencesService = require('../services/preferences.service')

const setRoomAction = {

    name: SET_ROOM_ACTION,

    execute() {
        return {
            messages: [
                'Введите аудиторию'
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
            PreferencesService.setCriterion(userId, CRITERIA_TYPES.ROOM, value, {
                success: room => {
                    resolve({
                        messages: [`Аудитория ${room} успешно выбрана`],
                        next: { action: MAIN_MENU_ACTION }
                    })
                },
                notFound: () => {
                    resolve({
                        messages: [`Аудитория ${value} не найдена`],
                        next: { action: SET_ROOM_ACTION }
                    })
                },
                ambiguous: groups => {
                    let message = 'Найдено несколько подходящих аудиторий:\n';
                    groups.forEach(g => message += g + '\n');
                    resolve({
                        messages: [message],
                        next: { action: SET_ROOM_ACTION }
                    })
                }
            })
        })
    }
}

module.exports = setRoomAction