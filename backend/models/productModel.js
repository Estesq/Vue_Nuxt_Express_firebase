const { db } = require('../db')

const database = db.firestore()

const productModel = database.collection('product')

module.exports = productModel
