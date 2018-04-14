const admins = process.env.TIMETABLE_BOT_PLATFORM_ADMINS ?
    process.env.TIMETABLE_BOT_PLATFORM_ADMINS.split(',') : []
const tokens = process.env.TIMETABLE_BOT_PLATFORM_TOKENS ?
    process.env.TIMETABLE_BOT_PLATFORM_TOKENS.split(',') : []

module.exports = {
    port: process.env.PORT || 3000,
    admins,
    apiUrl: process.env.TIMETABLE_API_SERVER || 'http://localhost:8080',
    tokens
}