const { SET_GROUP_ACTION, MAIN_MENU_ACTION, SETTINGS_ACTION } = require('../consts/actions.consts')
const { CRITERIA_TYPES } = require('../consts/timetable.consts')
const PreferencesService = require('../services/preferences.service')

const setGroupAction = {

    name: SET_GROUP_ACTION,

    execute() {
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
            }
        }
    },

    async handleResponse({ userId, value }) {
        return new Promise(resolve => {
            PreferencesService.setCriterion(userId, CRITERIA_TYPES.GROUP, value, {
                success: group => {
                    resolve({
                        response: { messages: [`Группа ${group} успешно выбрана`] },
                        next: { action: MAIN_MENU_ACTION }
                    })
                },
                notFound: () => {
                    resolve({
                        response: { messages: [`Группа ${value} не найдена`] },
                        next: { action: SET_GROUP_ACTION }
                    })
                },
                ambiguous: groups => {
                    let message = 'Найдено несколько подходящих групп:\n';
                    groups.forEach(g => message += g + '\n');
                    resolve({
                        response: { messages: [message] },
                        next: { action: SET_GROUP_ACTION }
                    })
                }
            })
        })
    }
}

module.exports = setGroupAction