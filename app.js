const express = require('express')
require('dotenv').config()
const cors = require('cors')

const authRouter = require('./routes/auth')
const reviewRouter = require('./routes/reviews')
const messageRouter = require('./routes/messages')
const conversationRouter = require('./routes/conversations')
const userRouter = require('./routes/users')
const connectDB = require('./db/db')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notfoundMiddleware = require('./middleware/not-found')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', messageRouter)
app.use('/api/v1/conversations', conversationRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use(notfoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
