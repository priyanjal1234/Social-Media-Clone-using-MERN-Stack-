const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()


// Database Connection
const db = require('./config/db')
db()

// Routes
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRouter)


const PORT = process.env.PORT || 4000
const ENVIRONMENT = process.env.NODE_ENV
app.listen(PORT,function() {
    console.log(`${ENVIRONMENT} : Server is running on port ${PORT}`)
})
