const {
  addCategory,
  myCategoryList,
  removeCategory,
  updateCategory
} = require('../controllers/categoryController')
const authVerify = require('../middlewares/authVerify')

var categoryRouter = require('express').Router()

categoryRouter.post('/add', authVerify, addCategory)
categoryRouter.get('/my', authVerify, myCategoryList)
categoryRouter.post('/delete', authVerify, removeCategory)
categoryRouter.post('/update', authVerify, updateCategory)

module.exports = categoryRouter
