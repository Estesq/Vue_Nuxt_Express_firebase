const db = require('../db')
const productModel = require('../models/productModel')
var admin = require('firebase-admin')

require('firebase/storage')
 const MIME_TYPES = {
    'image/jpg': '.jpg',
    'image/jpeg': '.jpg',
    'image/png': '.png'
  }
exports.addProduct = async (req, res) => {
  const { body } = req
  const { uid } = req.user
  let { files } = req
 
  try {
    var publicUrl = []
    let bucket = db.sBucket.bucket('zpay-a2806.appspot.com')

    files.forEach(async file => {
      let fileUpload = bucket.file(
        body.name + Date.now() + MIME_TYPES[file.mimetype]
      )
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      })

      blobStream.on('error', error => {
        console.error(error)
      })

      blobStream.on('finish', async () => {})

      blobStream.end(file.buffer)
      publicUrl.push(
        `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURI(fileUpload.name)}?alt=media`
      )
    })

    await productModel.add({ ...body, uid, image: publicUrl })
    res.send({ message: 'Product Added successfully!' })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
}
exports.myProductList = async (req, res) => {
  const { uid } = req.user
  try {
    const snapshot = await productModel.get()
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

exports.removeProduct = async (req, res) => {
  const { deleteId } = req.body
  console.log(req.body.deleteId)
  await productModel.doc(req.body.deleteId).delete()
  res.send({
    message: 'Product deleted succefully!'
  })
}

exports.updateProduct = async (req, res) => {
  await productModel.doc(req.body.updateId).update(req.body.product)
  res.send({
    message: 'Product updated succefully!'
  })
}

exports.deleteImage = async (req, res) => {
  let newImage = req.body.images.filter(el => el !== req.body.imageDelete)
  await productModel.doc(req.body.productId).update({ image: newImage })
  try {
    let bucket = db.sBucket.bucket('zpay-a2806.appspot.com')
    bucket
      .file(
        decodeURIComponent(req.body.imageDelete.split('/')[7].split('?')[0])
      )
      .delete()
      .then(result =>
        res.send({
          message: 'Image Deleted succefully!'
        })
      )
  } catch (error) {
    res.send({
      message: 'something went wrong!'
    })
  }
}
exports.addImage = async (req, res) => {
  let bucket = db.sBucket.bucket('zpay-a2806.appspot.com')
  let { productId } = req.body
  let images
  let file = req.file
  let fileUpload = bucket.file(
    file.originalname + Date.now() + MIME_TYPES[file.mimetype]
  )
  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  })

  blobStream.on('error', error => {
    console.error(error)
  })

  blobStream.on('finish', async () => {})

  blobStream.end(file.buffer)
  images=
    `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(
      fileUpload.name
    )}?alt=media`
  console.log(images);
  let final=await productModel.doc(productId).update({
    image:admin.firestore.FieldValue.arrayUnion(images)
  })
  res.send({
    message: 'Image Added succefully!'
  })
}
