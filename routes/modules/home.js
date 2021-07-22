// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryList = require('../../config/categoryList')

// 定義首頁路由
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then(records => res.render('index', { records, categoryList }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router