// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 定義首頁路由
router.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.title] = category.icon)

  return Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
        record.icon = categoryData[record.category]
      })
      res.render('index', { categories, records, totalAmount })
    })
    .catch(error => console.error(error))
})

// filter by category
router.get('/filter', async (req, res) => {
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.title] = category.icon)
  const categorySelected = req.query.categorySelect

  if (!categorySelected) return res.redirect('/')

  return Record.find({ category: categorySelected })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
        record.icon = categoryData[record.category]
      })
      res.render('index', { categories, records, totalAmount, categorySelected })
    })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router