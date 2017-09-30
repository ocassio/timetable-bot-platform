const knex = require('knex')
const { database, connectionUrl, preferencesTable } = require('../configs/db.config')

const db = knex({
    client: database,
    connection: connectionUrl
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
        return await db(preferencesTable).where('userId', userId).first()
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
        return await db(preferencesTable).insert({
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
        return await db(preferencesTable).where('userId', userId).update(preferences)
    }

    /**
     * Returns all user IDs except specified in excludes param
     * 
     * @static
     * @param {Array<string>} [excludes=[]] List of user IDs to exclude
     * @returns {Promise<Array<string>>} List of user IDs
     * @memberof DBService
     */
    static async getAllUsers(excludes = []) {
        const preferences = await db(preferencesTable).whereNotIn('userId', excludes).select()
        return preferences.map(p => p.userId)
    }

}

module.exports = DBService