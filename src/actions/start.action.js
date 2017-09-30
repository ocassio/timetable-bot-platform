const { START_ACTION, MAIN_MENU_ACTION, SELECT_CRITERION_ACTION } = require('../consts/actions.consts')
const PreferencesService = require('../services/preferences.service')

const startAction = {

    name: START_ACTION,

    async execute({ userId }) {
        const criterion = await PreferencesService.getCriterion(userId)
        if (criterion) {
            return {
                next: { action: MAIN_MENU_ACTION }
            }
        }

        return {
            response: {
                messages: [
                    'Добро пожаловать!\nДля начала работы Вам необходимо выбрать группу, преподавателя или аудиторию.'
                ]
            },
            next: { action: SELECT_CRITERION_ACTION }
        }
    }

}

module.exports = startAction