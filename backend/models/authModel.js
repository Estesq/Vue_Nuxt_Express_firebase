var db = require('../db')

module.exports = { firebase: db.app.auth(), admin: db.db.auth() }
