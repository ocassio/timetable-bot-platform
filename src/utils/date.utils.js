const moment = require('moment')

const DATE_FORMAT = 'DD.MM.YYYY'
const DATE_REGEX = /\d{2}\.\d{2}\.\d{4}/g

class DateUtils {

    static isDate(string) {
        return this.toMoment(string).isValid()
    }

    static toString(date) {
        return moment(date).format(DATE_FORMAT)
    }

    static toMoment(string) {
        return moment(string, DATE_FORMAT, true)
    }

    static toDate(string) {
        return this.toMoment(string).toDate()
    }

    static getDayOfWeek(string) {
        let dayOfWeek = this.toMoment(string).format('dddd')
        dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)

        return dayOfWeek
    }

    static getDayOfWeekNumber(string) {
        return this.toMoment(string).day()
    }

    static isToday(string) {
        return this.toMoment(string).isSame(new Date(), 'day')
    }

    static isBefore(first, second) {
        const f = typeof first == 'string' ? this.toMoment(first) : moment(first)
        const s = typeof second == 'string' ? this.toMoment(second) : moment(second)

        return f.isBefore(s)
    }

    static isAfter(first, second) {
        const f = typeof first == 'string' ? this.toMoment(first) : moment(first)
        const s = typeof second == 'string' ? this.toMoment(second) : moment(second)

        return f.isAfter(s)
    }

    static getTodayRange() {
        const now = moment().format(DATE_FORMAT)
        return {
            from: now,
            to: now
        }
    }

    static getSevenDays() {
        const now = moment()
        return {
            from: now.format(DATE_FORMAT),
            to: now.add(6, 'days').format(DATE_FORMAT)
        }
    }

    static getCurrentWeek() {
        const now = moment()
        return {
            from: now.startOf('week').format(DATE_FORMAT),
            to: now.endOf('week').format(DATE_FORMAT)
        }
    }

    static getNextWeek() {
        const next = moment().add(1, 'week')
        return {
            from: next.startOf('week').format(DATE_FORMAT),
            to: next.endOf('week').format(DATE_FORMAT)
        }
    }

    static getCurrentMonth() {
        const now = moment()
        return {
            from: now.startOf('month').format(DATE_FORMAT),
            to: now.endOf('month').format(DATE_FORMAT)
        }
    }

    static getDates(string) {
        if (!string) return []
        const dates = string.match(DATE_REGEX)
        return dates ? dates : []
    }

    static getDateRange(string) {
        
        let dateRange
        const dates = this.getDates(string)

        if (dates.length == 0) {
            dateRange = this.getTodayRange()
        } else if (dates.length == 1) {
            dateRange = {
                from: dates[0],
                to: dates[0]
            }
        } else {
            if (this.isBefore(dates[0], dates[1])) {
                dateRange = {
                    from: dates[0],
                    to: dates[1]
                }
            } else {
                dateRange = {
                    from: dates[1],
                    to: dates[0]
                }
            }
        }

        return dateRange
    }

}

module.exports = DateUtils