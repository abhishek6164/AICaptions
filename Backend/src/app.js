const express = require('express')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express()
app.use(cookieParser())
app.use(express.json())

// CORS config
app.use(cors({
  origin: [
    "https://aicaptions-frontend.onrender.com",
    "http://localhost:5173" // dev ke liye
  ],
  credentials: true, // cookie send karne ke liye must
}));

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

module.exports = app;