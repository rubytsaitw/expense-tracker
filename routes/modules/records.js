const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, icon, date, amount } = req.body
  return Record.create({
    name, category, icon, date, amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router 