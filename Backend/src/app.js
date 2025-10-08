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
  origin: "https://aicaptions-1.onrender.com",
  credentials: true
}));

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

module.exports = app; // ✅ correct export