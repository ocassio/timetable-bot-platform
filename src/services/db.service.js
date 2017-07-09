const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: process.env.TIMETABLE_BOT_DB
})

class DBService {

    static async getPreferences(userId) {
        return await db('preferences').where('userId', userId).first()
    }

    static async createPreferences(userId, preferences) {
        return await db('preferences').insert({
            userId: userId,
            criteriaType: preferences.criteriaType,
            criterionId: preferences.criterionId,
            from: preferences.from,
            to: preferences.to
        })
    }

    static async updatePreferences(userId, preferences) {
        return await db('preferences').where('userId', userId).update(preferences)
    }

}

module.exports = DBService