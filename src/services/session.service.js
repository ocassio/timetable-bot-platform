const session = {}

/**
 * Service for session related logic
 * 
 * @class SessionService
 */
class SessionService {

    /**
     * Returns all session params for specified user
     * 
     * @static
     * @param {string} userId User ID
     * @returns {object} Session params for specified user
     * @memberof SessionService
     */
    static getParams(userId) {
        if (!session[userId]) {
            session[userId] = {}
        }
        return session[userId]
    }

    /**
     * Returns specified param value for specified user
     * 
     * @static
     * @param {string} userId User ID
     * @param {string} name Param name
     * @returns {object} Param value
     * @memberof SessionService
     */
    static getParam(userId, name) {
        return this.getParams(userId)[name];
    }

    /**
     * Sets specified param value for the user session
     * 
     * @static
     * @param {string} userId User ID
     * @param {string} name Param name
     * @param {any} value Param value
     * @memberof SessionService
     */
    static setParam(userId, name, value) {
        this.getParams(userId)[name] = value
    }

    /**
     * Removes specified param from session
     * 
     * @static
     * @param {string} userId User ID
     * @param {string} name User name
     * @memberof SessionService
     */
    static removeParam(userId, name) {
        this.getParams(userId)[name] = null
    }

    /**
     * Invalidates session for specified user
     * 
     * @static
     * @param {string} userId User ID
     * @memberof SessionService
     */
    static invalidate(userId) {
        session[userId] = null
    }

}

module.exports = SessionService