const { 
    SELECT_CRITERION_ACTION,
    SET_GROUP_ACTION,
    SET_ROOM_ACTION,
    SET_TEACHER_ACTION,
    SETTINGS_ACTION,
    MAIN_MENU_ACTION
} = require('../consts/actions.consts')

const selectCriterionAction = {

    name: SELECT_CRITERION_ACTION,

    execute({ customTimetable }) {
        return {
            response: {
                messages: [
                    'Выберите тип критерия'
                ],
                buttons: [
                    {
                        label: 'Группа',
                        action: SET_GROUP_ACTION,
                        params: { customTimetable }
                    },
                    {
                        label: 'Преподаватель',
                        action: SET_TEACHER_ACTION,
                        params: { customTimetable }
                    },
                    {
                        label: 'Аудитория',
                        action: SET_ROOM_ACTION,
                        params: { customTimetable }
                    },
                    {
                        label: 'Назад',
                        action: customTimetable ? MAIN_MENU_ACTION : SETTINGS_ACTION
                    }
                ]
            }
        }
    }
}

module.exports = selectCriterionAction