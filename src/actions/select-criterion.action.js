const { 
    SELECT_CRITERION_ACTION,
    SET_GROUP_ACTION,
    SET_ROOM_ACTION,
    SET_TEACHER_ACTION,
    SETTINGS_ACTION
} = require('../consts/actions.consts')

const selectCriterionAction = {

    name: SELECT_CRITERION_ACTION,

    execute() {
        return {
            response: {
                messages: [
                    'Выберите тип критерия'
                ],
                buttons: [
                    {
                        label: 'Группа',
                        action: SET_GROUP_ACTION
                    },
                    {
                        label: 'Преподаватель',
                        action: SET_TEACHER_ACTION
                    },
                    {
                        label: 'Аудитория',
                        action: SET_ROOM_ACTION
                    },
                    {
                        label: 'Назад',
                        action: SETTINGS_ACTION
                    }
                ]
            }
        }
    }
}

module.exports = selectCriterionAction