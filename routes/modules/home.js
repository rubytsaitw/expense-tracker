// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 定義首頁路由
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

// filter by category
router.get('/filter', (req, res) => {
  const categorySelected = req.query.category

  if (!category) return res.redirect('/')

  return Record.find({ category: categorySelected })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router