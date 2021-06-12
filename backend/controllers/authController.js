const authModel = require('../models/authModel')

exports.signin = async (req, res) => {
  try {
    let result = await authModel.firebase.signInWithEmailAndPassword(
      req.body.email,
      req.body.password
    )
    let token = await result.user.getIdToken()
    console.log(result.user.refreshToken)
    if (result) res.send({ token, refreshToken: result.user.refreshToken })
  } catch (error) {
    res.send({ error })
  }
}

exports.register = async (req, res) => {
  try {
    let result = await authModel.firebase.createUserWithEmailAndPassword(
      req.body.email,
      req.body.password
    )
    let token = await result.user.getIdToken()
    if (token) res.send({ message: 'Registartion successful!' })
  } catch (error) {
    res.send({ error })
  }
}
exports.userInfo = async (req, res) => {
  if (await req.user) {
    console.log(req.user)
    res.send({ user: req.user })
  } else {
    res.send({ error: "You aren't authorized" })
  }
}
exports.signout = (req, res) => {
  res.send({ token: null })
}
