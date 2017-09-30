const APIService = require('./api.service')
const DBService = require('./db.service')

/**
 * @typedef Criterion
 * @property {string} id Criterion ID
 * @property {number} type Criterion type
 */

/**
 * @typedef CriterionSelectionCallbacks
 * @property {function} success Callback, that is called when operation is completed successfully
 * @property {function} notFound Callback, that is called when no criterion with such name has been found
 * @property {function} ambiguous Callback, that is called when multiple criteria have been found
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
     * @param {CriterionSelectionCallbacks} actions Set of callbacks
     * @memberOf PreferencesService
     */
    static setCriterion(userId, criteriaType, criterionName, actions) {
        processCriterionSelection(userId, criteriaType, criterionName, actions, saveCriterionToPreferences)
    }

    /**
     * Checks if specified criterion type and ID are valid
     * 
     * @static
     * @param {string} userId User ID
     * @param {number} criteriaType Criteria type ID
     * @param {string} criterionName Criterion name
     * @param {CriterionSelectionCallbacks} actions Set of callbacks
     * @memberOf PreferencesService
     */
    static checkCriterion(userId, criteriaType, criterionName, actions) {
        processCriterionSelection(userId, criteriaType, criterionName, actions)
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

/**
 * Processes criterion selection for the user with specified ID
 * 
 * @static
 * @param {string} userId User ID
 * @param {number} criteriaType Criteria type ID
 * @param {string} criterionName Criterion name
 * @param {CriterionSelectionCallbacks} actions Set of callbacks
 * @param {function} [saveAction] Save operation
 * @memberOf PreferencesService
 */
async function processCriterionSelection(userId, criteriaType, criterionName, actions, saveAction) {

    const criteria = await APIService.getCriteria(criteriaType)
    const filteredCriteria = criteria.filter(
        criterion => criterion.name.toLowerCase().includes(criterionName.toLowerCase())
    )

    if (filteredCriteria.length == 0) {
        actions.notFound()
        return
    }
    
    let criterion        

    if (filteredCriteria.length > 1) {

        criterion = filteredCriteria.find(
            criterion => criterion.name.toLowerCase() == criterionName.toLowerCase()
        )

        if (!criterion) {
            const criteriaNames = filteredCriteria.map(c => c.name)
            actions.ambiguous(criteriaNames)
            return
        }
        
    } else {
        criterion = filteredCriteria[0]
    }

    if (saveAction) {
        await saveAction(userId, criteriaType, criterion)
    }
    
    actions.success(criterion)
}

/**
 * Saves selected criterion as preference for the user
 * 
 * @static
 * @param {string} userId User ID
 * @param {number} criteriaType Criteria type ID
 * @param {Criterion} criterion Criterion
 */
async function saveCriterionToPreferences(userId, criteriaType, criterion) {
    let preferences = await DBService.getPreferences(userId)
    
    if (preferences) {
        preferences.criteriaType = criteriaType
        preferences.criterionId = criterion.id
        await DBService.updatePreferences(userId, preferences)
    } else {
        preferences = {
            criteriaType: criteriaType,
            criterionId: criterion.id
        }
        await DBService.createPreferences(userId, preferences)
    }
}

module.exports = PreferencesService