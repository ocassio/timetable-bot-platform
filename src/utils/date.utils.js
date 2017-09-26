const moment = require('moment')
const actions = require('../actions')

const DATE_FORMAT = 'DD.MM.YYYY'
const DATE_REGEX = /\d{2}\.\d{2}\.\d{4}/g

/**
 * @typedef DateRange
 * @property {string} from Begin date
 * @property {string} to End date
 */

/**
 * Utility class for date related operations
 * 
 * @class DateUtils
 */
class DateUtils {

    /**
     * Checks if specified string is date
     * 
     * @static
     * @param {string} string String to check
     * @returns {boolean} If specified string is date
     * @memberof DateUtils
     */
    static isDate(string) {
        return this.toMoment(string).isValid()
    }

    /**
     * Converts date to string
     * 
     * @static
     * @param {Date} date Date to convert
     * @returns {string} Result string
     * @memberof DateUtils
     */
    static toString(date) {
        return moment(date).format(DATE_FORMAT)
    }

    /**
     * Converts string to moment date
     * 
     * @static
     * @param {string} string String to convert
     * @returns {Date} Moment date
     * @memberof DateUtils
     */
    static toMoment(string) {
        return moment(string, DATE_FORMAT, true)
    }

    /**
     * Converts string to JS date
     * 
     * @static
     * @param {string} string String to convert
     * @returns {Date} JS date
     * @memberof DateUtils
     */
    static toDate(string) {
        return this.toMoment(string).toDate()
    }

    /**
     * Gets day of week name from date string
     * 
     * @static
     * @param {string} string Date string
     * @returns {string} Day of week name
     * @memberof DateUtils
     */
    static getDayOfWeek(string) {
        let dayOfWeek = this.toMoment(string).format('dddd')
        dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)

        return dayOfWeek
    }

    /**
     * Gets day of week number from date string
     * 
     * @static
     * @param {string} string Date string
     * @returns {number} Day of week number
     * @memberof DateUtils
     */
    static getDayOfWeekNumber(string) {
        return this.toMoment(string).day()
    }

    /**
     * Checks if specified string date represents current date
     * 
     * @static
     * @param {any} string 
     * @returns {boolean} If specified string date represents current date
     * @memberof DateUtils
     */
    static isToday(string) {
        return this.toMoment(string).isSame(new Date(), 'day')
    }

    /**
     * Checks if first date is before the second one
     * 
     * @static
     * @param {string|Date} first First date
     * @param {string|Date} second Second date
     * @returns {boolean} If first date is before the second one
     * @memberof DateUtils
     */
    static isBefore(first, second) {
        const f = typeof first == 'string' ? this.toMoment(first) : moment(first)
        const s = typeof second == 'string' ? this.toMoment(second) : moment(second)

        return f.isBefore(s)
    }

    /**
     * Checks if first date is after the second one
     * 
     * @static
     * @param {string|Date} first First date
     * @param {string|Date} second Second date
     * @returns {boolean} If first date is after the second one
     * @memberof DateUtils
     */
    static isAfter(first, second) {
        const f = typeof first == 'string' ? this.toMoment(first) : moment(first)
        const s = typeof second == 'string' ? this.toMoment(second) : moment(second)

        return f.isAfter(s)
    }

    /**
     * Returns date range for the current day
     * 
     * @static
     * @returns {DateRange} Date range for the current date
     * @memberof DateUtils
     */
    static getTodayRange() {
        const now = moment().format(DATE_FORMAT)
        return {
            from: now,
            to: now
        }
    }

    /**
     * Returns date range for the next day
     * 
     * @static
     * @returns {DateRange} Date range for the next day
     * @memberof DateUtils
     */
    static getTomorrowRange() {
        const tomorrow = moment().add(1, 'days').format(DATE_FORMAT)
        return {
            from: tomorrow,
            to: tomorrow
        }
    }

    /**
     * Returns date range for next seven days
     * 
     * @static
     * @returns {DateRange} Date range for next seven days
     * @memberof DateUtils
     */
    static getSevenDays() {
        const now = moment()
        return {
            from: now.format(DATE_FORMAT),
            to: now.add(6, 'days').format(DATE_FORMAT)
        }
    }

    /**
     * Returns date range for the current week
     * 
     * @static
     * @returns {DateRange} Date range for the current week
     * @memberof DateUtils
     */
    static getCurrentWeek() {
        const now = moment()
        return {
            from: now.startOf('week').format(DATE_FORMAT),
            to: now.endOf('week').format(DATE_FORMAT)
        }
    }

    /**
     * Returns date range for the next week
     * 
     * @static
     * @returns {DateRange} Date range for the next week
     * @memberof DateUtils
     */
    static getNextWeek() {
        const next = moment().add(1, 'week')
        return {
            from: next.startOf('week').format(DATE_FORMAT),
            to: next.endOf('week').format(DATE_FORMAT)
        }
    }

    /**
     * Returns date range for the current month
     * 
     * @static
     * @returns {DateRange} Date range for the current month
     * @memberof DateUtils
     */
    static getCurrentMonth() {
        const now = moment()
        return {
            from: now.startOf('month').format(DATE_FORMAT),
            to: now.endOf('month').format(DATE_FORMAT)
        }
    }

    /**
     * Retrieves all dates from the string
     * 
     * @static
     * @param {string} string String to retrieve date from
     * @returns {Array<string>} List of dates
     * @memberof DateUtils
     */
    static getDates(string) {
        if (!string) return []
        const dates = string.match(DATE_REGEX)
        return dates ? dates : []
    }

    /**
     * Retrieves date range from the specified string
     * 
     * @static
     * @param {string} string String to retrieve date range from
     * @returns {DateRange} Date range
     * @memberof DateUtils
     */
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