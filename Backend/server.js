require('dotenv').config()
const {
  connect
} = require('mongoose')
const app = require('./src/App.js')
const connectDB = require('./src/db/db')

connectDB()

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})