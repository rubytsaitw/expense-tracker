const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


// Create
router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return res.render('new', { categories })
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