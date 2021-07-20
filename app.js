const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000

const Record = require('./models/record')

const routes = require('./routes')
require('./config/mongoose')
const handlebarsHelpers = require('./utils/handlebarsHelpers')

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require('./utils/handlebarsHelpers')
}))
app.set('view engine', 'hbs')

app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})