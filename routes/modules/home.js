// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const { range } = require('../../utils/handlebarsHelpers')

const Record = require('../../models/record')
const Category = require('../../models/category')

// 定義首頁路由
router.get('/', async (req, res) => {
  const userId = req.user._id
  // Create Category icon & dropdown
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => {
    categoryData[category.title] = category.icon
    return categories
  })

  // Create Year/Month dropdown
  await Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      if (!records.length) {
        res.render('index')
      } else {
        const months = range(1, 12)
        const minYear = records[0].date.getFullYear()
        const maxYear = records[records.length - 1].date.getFullYear()
        const years = range(minYear, maxYear)
        let totalAmount = 0
        records.forEach(record => {
          totalAmount += record.amount
          record.icon = categoryData[record.category]
        })
        res.render('index', { categories, years, months, records, totalAmount })
      }
    })
    .catch(error => console.error(error))
})

// filter by category & Year/Month
router.get('/filter', async (req, res) => {
  const userId = req.user._id

  // Create Category icon & dropdown
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => {
    categoryData[category.title] = category.icon
    return categories
  })

  // Create Year/Month dropdown
  const allRecords = await Record.find({ userId }).lean().sort({ date: 'asc' })
  const months = range(1, 12)
  const minYear = allRecords[0].date.getFullYear()
  const maxYear = allRecords[allRecords.length - 1].date.getFullYear()
  const years = range(minYear, maxYear)

  // filter criteria selected
  const categorySelected = req.query.categorySelect
  const yearSelected = req.query.yearSelect
  const monthSelected = req.query.monthSelect

  // error handling
  const errors = []
  if ((yearSelected && !monthSelected) || (!yearSelected && monthSelected)) {
    errors.push({ message: 'Please select both year and month.' })
    return res.render('index', { errors })
  }

  // filter criteria
  const filterCriteria = { userId: userId }
  if (categorySelected) { filterCriteria.category = categorySelected }
  if (yearSelected) { filterCriteria.year = Number(yearSelected) }
  if (monthSelected) { filterCriteria.month = Number(monthSelected) }

  // use MongoDB aggregate pipeline (聚合管道)
  await Record.aggregate([
    { $project: { name: 1, category: 1, date: 1, amount: 1, merchant: 1, userId: 1, year: { $year: '$date' }, month: { $month: '$date' } } },
    { $match: filterCriteria }
  ])
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
        record.icon = categoryData[record.category]
      })
      res.render('index', { categories, years, months, records, totalAmount, categorySelected, yearSelected, monthSelected })
    })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router
