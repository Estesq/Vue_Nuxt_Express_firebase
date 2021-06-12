const {
  addProduct,
  myProductList
} = require('../controllers/productController')
const authVerify = require('../middlewares/authVerify')

var productRouter = require('express').Router()

productRouter.post('/add', authVerify, addProduct)
productRouter.get('/my', authVerify, myProductList)

module.exports = productRouter
