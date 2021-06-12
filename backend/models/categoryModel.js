const { db } = require('../db')

const database = db.firestore()

const categoryModel = database.collection('category')

module.exports = categoryModel
