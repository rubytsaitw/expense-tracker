// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const { range } = require('../../utils/handlebarsHelpers')

const Record = require('../../models/record')
const Category = require('../../models/category')

// 定義首頁路由
router.get('/', async (req, res) => {
  const userId = req.user._id
  // Create Category dropdown
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.title] = category.icon)

  // Create Year/Month dropdown
  await Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      const months = range(1, 12)
      const minYear = records[0].date.getFullYear()
      const maxYear = records[records.length - 1].date.getFullYear()
      const years = range(minYear, maxYear)
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
        record.icon = categoryData[record.category]
      })
      console.log('render years:', years)
      console.log('render months:', months)
      res.render('index', { categories, years, months, records, totalAmount })
    })
    .catch(error => console.error(error))
})

// filter by category & Year/Month
router.get('/filter', async (req, res) => {
  const userId = req.user._id
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.title] = category.icon)
  const categorySelected = req.query.categorySelect
  const yearSelected = req.query.yearSelect
  const monthSelected = req.query.monthSelect
  console.log('catS:', categorySelected)
  console.log('yearS:', yearSelected)
  console.log('monthS:', monthSelected)

  filterCriteria = {}
  if (categorySelected) { filterCriteria['category'] = categorySelected }
  if (yearSelected) { filterCriteria['year'] = yearSelected }
  if (monthSelected) { filterCriteria['month'] = monthSelected }
  console.log(filterCriteria)

  await Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        record['year'] = record.date.getFullYear().toString().trim()
        record['month'] = record.date.getMonth().toString().trim()
        console.log('record.year', record.year)
        console.log(record)
        // console.log('record[year]', record['year'])
      })
    })
    // .then(records => {
    //   await Record.find({ userId, filterCriteria })
    //     .lean()
    //     .sort({ _id: 'asc' })
    //     .then(records => {
    //       let totalAmount = 0
    //       records.forEach(record => {
    //         totalAmount += record.amount
    //         record.icon = categoryData[record.category]
    //       })
    //       res.render('index', { categories, records, totalAmount, categorySelected, yearSelected, monthSelected })
    //     })
    //     .catch(error => console.error(error))
    // })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router