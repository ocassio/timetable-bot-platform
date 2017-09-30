const { admins } = require('../configs/platform.config')
const DBService = require('../services/db.service')

/**
 * Service for user related logic
 * 
 * @class UserService
 */
class UserService {

    /**
     * Checks if specified user is admin
     * 
     * @static
     * @param {string} userId User ID
     * @returns {boolean} If specified user is admin
     * @memberof UserService
     */
    static isAdmin(userId) {
        return admins.includes(userId)
    }

    /**
     * Returns all user IDs excluding provided one
     * 
     * @static
     * @param {string} userId User ID to exclude
     * @returns {Promise<Array<string>>} List of user IDs
     * @memberof UserService
     */
    static async getAllOtherUsers(userId) {
        return await DBService.getAllUsers([userId]);
    }

}

module.exports = UserService