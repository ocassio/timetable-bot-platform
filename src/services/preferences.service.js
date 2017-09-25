const APIService = require('./api.service')
const DBService = require('./db.service')

/**
 * @typedef Criterion
 * @property {string} id Criterion ID
 * @property {number} type Criterion type
 */

/**
 * Service for preferences related business logic 
 * 
 * @class PreferencesService
 */
class PreferencesService {

    /**
     * Sets specified criterion for the user with specified ID
     * 
     * @static
     * @param {string} userId User ID
     * @param {number} criteriaType Criteria type ID
     * @param {string} criterionName Criterion name
     * @param {object} actions Set of callbacks
     * @param {function} actions.success Callback, that is called when operation is completed successfully
     * @param {function} actions.notFound Callback, that is called when no criterion with such name has been found
     * @param {function} actions.ambiguous Callback, that is called when multiple criteria have been found
     * @memberOf PreferencesService
     */
    static async setCriterion(userId, criteriaType, criterionName, actions) {
        
        const criteria = await APIService.getCriteria(criteriaType);
        const filteredCriteria = criteria.filter(
            criterion => criterion.name.toLowerCase().includes(criterionName.toLowerCase())
        );

        if (filteredCriteria.length == 0) {
            actions.notFound();
            return;
        }
        
        let criterion;        

        if (filteredCriteria.length > 1) {

            criterion = filteredCriteria.find(
                criterion => criterion.name.toLowerCase() == criterionName.toLowerCase()
            );

            if (!criterion) {
                const criteriaNames = filteredCriteria.map(c => c.name);
                actions.ambiguous(criteriaNames);
                return;
            }
            
        } else {
            criterion = filteredCriteria[0];
        }

        let preferences = await DBService.getPreferences(userId);

        if (preferences) {
            preferences.criteriaType = criteriaType;
            preferences.criterionId = criterion.id;
            await DBService.updatePreferences(userId, preferences);
        } else {
            preferences = {
                criteriaType: criteriaType,
                criterionId: criterion.id
            };
            await DBService.createPreferences(userId, preferences);
        }

        actions.success(criterion.name);
    }

    /**
     * Returns current criterion for the user with specified ID
     * 
     * @static
     * @param {string} userId User ID
     * @returns {Criterion} criterion Current criterion
     * @memberof PreferencesService
     */
    static async getCriterion(userId) {
        const preferences = await DBService.getPreferences(userId)
        if (preferences) {
            return {
                id: preferences.criterionId,
                type: preferences.criteriaType
            }
        }
    }

}

module.exports = PreferencesService