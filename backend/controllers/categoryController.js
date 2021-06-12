const categoryModel = require('../models/categoryModel')

exports.addCategory = async (req, res) => {
  const { body } = req
  const { uid } = req.user
  try {
    await categoryModel.add({ ...body, uid })
    return res.send({ message: 'Category successfully added!' })
  } catch (error) {
    return res.send({ error })
  }
}
exports.myCategoryList = async (req, res) => {
  const { uid } = req.user
  try {
    const snapshot = await categoryModel.get()
    if (snapshot.empty) {
      return res.send({ error: 'No matching documents.' })
    }
    var result = []
    snapshot.forEach(doc => {
      let result1 = doc.data()
      console.log(result1.uid === uid)
      if (result1.uid === uid) {
        result.push({ id: doc.id, ...result1 })
      }
    })
    res.send(result)
  } catch (error) {
    return res.send({ error })
  }
}
