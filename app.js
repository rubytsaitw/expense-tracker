const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')
const helpers = require('handlebars-helpers')();
const { dateToString } = require('./utils/handlebarsHelpers')

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: { helpers, dateToString }
}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(routes)
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})