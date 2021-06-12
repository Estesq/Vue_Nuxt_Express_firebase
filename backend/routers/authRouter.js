const {
  signin,
  register,
  userInfo,
  signout
} = require('../controllers/authController')
const authVerify = require('../middlewares/authVerify')

var authRouter = require('express').Router()

authRouter.post('/login', signin)
authRouter.post('/register', register)
authRouter.get('/user', authVerify, userInfo)
authRouter.get('/logout', signout)

module.exports = authRouter
