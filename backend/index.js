const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const authRouter = require('./routers/authRouter')
const categoryRouter = require('./routers/categoryRouter')
const productRouter = require('./routers/productRouter')

const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use('/auth', authRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)

app.listen(8989, () => {
  console.log('running')
})
