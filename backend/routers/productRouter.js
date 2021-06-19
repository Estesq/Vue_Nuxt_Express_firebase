const multer = require('multer')
const {
  addProduct,
  myProductList,
  removeProduct,
  updateProduct,
  deleteImage,
  addImage} = require('../controllers/productController')
const authVerify = require('../middlewares/authVerify')

var productRouter = require('express').Router()
const upload = multer({
  storage: multer.memoryStorage()
})

productRouter.post('/add', [authVerify, upload.array('files')], addProduct)
productRouter.get('/my', authVerify, myProductList)
productRouter.post('/delete', authVerify, removeProduct)
productRouter.post('/update', authVerify, updateProduct)
productRouter.post('/update/image', authVerify, deleteImage)
productRouter.post('/add/image', [authVerify, upload.single('file')], addImage)

module.exports = productRouter
