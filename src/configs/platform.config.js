const admins = process.env.TIMETABLE_BOT_PLATFORM_ADMINS ?
    process.env.TIMETABLE_BOT_PLATFORM_ADMINS.split(',') : []

module.exports = {
    port: process.env.PORT || 3000,
    admins,
    apiUrl: process.env.TIMETABLE_API_SERVER || 'http://localhost:8080'
}