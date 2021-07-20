// 引用 Express 與 Express 路由器
const express = require('express')
const app = express()

const PORT = 3000

require('./config/mongoose')

// 引用 Todo model
const Record = require('./models/record')

// 引用路由器
const routes = require('./routes')
// 將 request 導入路由器
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})