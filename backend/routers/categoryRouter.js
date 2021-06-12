const {
  addCategory,
  myCategoryList
} = require('../controllers/categoryController')
const authVerify = require('../middlewares/authVerify')

var categoryRouter = require('express').Router()

categoryRouter.post('/add', authVerify, addCategory)
categoryRouter.get('/my', authVerify, myCategoryList)

module.exports = categoryRouter
