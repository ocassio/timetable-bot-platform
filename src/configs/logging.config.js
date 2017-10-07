const intel = require('intel')

const level = process.env.TIMETABLE_BOT_PLATFORM_LOG_LEVEL || 'INFO'

module.exports = {
    file: process.env.TIMETABLE_BOT_PLATFORM_LOG_FILE,
    format: '[%(levelname)s] %(date)s - %(message)s',
    level: intel[level]
}