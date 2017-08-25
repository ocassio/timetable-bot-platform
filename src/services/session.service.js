const session = {}

class SessionService {

    static getParams(userId) {
        return session[userId] || {}
    }

    static getParam(userId, name) {
        return this.getParams(userId)[name];
    }

    static setParam(userId, name, value) {
        this.getParams(userId)[name] = value
    }

    static removeParam(userId, name) {
        this.getParams(userId)[name] = null
    }

    static invalidate(userId) {
        session[userId] = null
    }

}

module.exports = SessionService