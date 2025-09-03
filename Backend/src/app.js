const express = require('express')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors');


const app = express()
app.use(cookieParser())
app.use(express.json())

// middleware
app.use(cors({
  origin: "http://localhost:5173",   // 👈 frontend origin
  credentials: true
}));

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

module.exports = app;