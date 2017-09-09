const setGroupAction = require('./set-group.action')
const settingsAction = require('./settings.action')

const selectCriterionAction = {

    name: 'selectCriterion',

    execute() {
        return {
            messages: [
                'Выберите тип критерия'
            ],
            buttons: [
                {
                    label: 'Группа',
                    action: setGroupAction.name
                },
                {
                    label: 'Преподаватель',
                    action: 'setTeacher'
                },
                {
                    label: 'Аудитория',
                    action: 'setRoom'
                },
                {
                    label: 'Назад',
                    action: settingsAction.name
                }
            ]
        }
    }
}

module.exports = selectCriterionAction