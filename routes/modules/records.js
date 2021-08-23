const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Create: Get the New page
router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return res.render('new', { categories })
})

// Create new record
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, amount, merchant } = req.body
  return Record.create({
    name, category, date, amount, merchant, userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Update/Edit (Get the record)
router.get('/:id/edit', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categories = await Category.find().lean()
  return Record.findOne({ userId, _id })
    .lean()
    .then((record) => res.render('edit', { record, categories }))
    .catch((error) => console.log(error))
})

// Update/Edit (Put modified record)
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const update = req.body
  return Record.findOneAndUpdate({ userId, _id }, update, { new: true })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ userId, _id })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
