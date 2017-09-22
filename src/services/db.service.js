const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: process.env.TIMETABLE_BOT_DB
})

/**
 * @typedef Preferences
 * @property {string} userId User ID
 * @property {number} criteriaType Criterion type
 * @property {string} criterionId Criterion ID
 * @property {string} from Selected date range start
 * @property {string} to Selected date range end
 */

/**
 * Service for database related logic
 * 
 * @class DBService
 */
class DBService {

    /**
     * Returns user preferences
     * 
     * @static
     * @async
     * @param {string} userId User ID
     * @returns {Promise<Preferences>} Preferences
     * @memberof DBService
     */
    static async getPreferences(userId) {
        return await db('preferences').where('userId', userId).first()
    }

    /**
     * Creates user preferences
     * 
     * @static
     * @param {string} userId User ID
     * @param {Preferences} preferences Preferences
     * @returns {Promise<void>}
     * @memberof DBService
     */
    static async createPreferences(userId, preferences) {
        return await db('preferences').insert({
            userId: userId,
            criteriaType: preferences.criteriaType,
            criterionId: preferences.criterionId,
            from: preferences.from,
            to: preferences.to
        })
    }

    /**
     * Updates user preferences
     * 
     * @static
     * @param {string} userId User ID
     * @param {Preferences} preferences Preferences
     * @returns {Promise<void>}
     * @memberof DBService
     */
    static async updatePreferences(userId, preferences) {
        return await db('preferences').where('userId', userId).update(preferences)
    }

}

module.exports = DBService