const {
    SELECT_DATE_RANGE_ACTION,
    MAIN_MENU_ACTION,
    TIMETABLE_TODAY_ACTION,
    TIMETABLE_TOMORROW_ACTION,
    TIMETABLE_SEVEN_DAYS_ACTION,
    TIMETABLE_CURRENT_WEEK_ACTION,
    TIMETABLE_NEXT_WEEK_ACTION,
    TIMETABLE_CUSTOM_ACTION
} = require('../consts/actions.consts')

const selectDateRangeAction = {

    name: SELECT_DATE_RANGE_ACTION,

    execute({ criterion }) {
        return {
            response: {
                messages: [
                    'Выберите временной диапазон'
                ],
                buttons: [
                    {
                        label: 'Сегодня',
                        action: TIMETABLE_TODAY_ACTION,
                        params: { criterion }
                    },
                    {
                        label: 'Завтра',
                        action: TIMETABLE_TOMORROW_ACTION,
                        params: { criterion }
                    },
                    {
                        label: '7 дней',
                        action: TIMETABLE_SEVEN_DAYS_ACTION,
                        params: { criterion }
                    },
                    {
                        label: 'Текущая неделя',
                        action: TIMETABLE_CURRENT_WEEK_ACTION,
                        params: { criterion }
                    },
                    {
                        label: 'Следующая неделя',
                        action: TIMETABLE_NEXT_WEEK_ACTION,
                        params: { criterion }
                    },
                    {
                        label: 'Свой вариант',
                        action: TIMETABLE_CUSTOM_ACTION,
                        params: { criterion }
                    },
                    {
                        label: 'Назад',
                        action: MAIN_MENU_ACTION
                    }
                ]
            }
        }
    }

}

module.exports = selectDateRangeAction