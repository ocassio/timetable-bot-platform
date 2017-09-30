const { BROADCAST_ACTION, MAIN_MENU_ACTION } = require('../consts/actions.consts')
const UserService = require('../services/user.service')

const broadcastAction = {

    name: BROADCAST_ACTION,

    execute({ userId }) {
        if (!UserService.isAdmin(userId)) {
            return {
                next: { action: MAIN_MENU_ACTION }
            }
        }

        return {
            response: {
                messages: [
                    'Данное сообщение будет отправлено всем пользователям ботов, кроме Вас.\nВведите текст сообщения:'
                ],
                buttons: [
                    {
                        label: 'Отмена',
                        action: MAIN_MENU_ACTION
                    }
                ]
            }
        }
    },

    async handleResponse({ userId, value }) {
        if (!UserService.isAdmin(userId)) {
            return {
                next: { action: MAIN_MENU_ACTION }
            }
        }

        if (!value) return

        const recipients = await UserService.getAllOtherUsers(userId)
        return {
            response: {
                messages: [value],
                recipients
            },
            next: { action: MAIN_MENU_ACTION }
        }
    }

}

module.exports = broadcastAction