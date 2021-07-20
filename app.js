const express = require('express')
const app = express()

const PORT = 3000

require('./config/mongoose')

const Record = require('./models/record')

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})