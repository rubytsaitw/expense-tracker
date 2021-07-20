const Record = require('../record')
const db = require('../../config/mongoose')

const records = [
  {
    name: '金色三麥',
    category: '餐飲食品',
    date: '2020-12-09',
    amount: 800
  },
  {
    name: 'THE WANG',
    category: '餐飲食品',
    date: '2021-07-06',
    amount: 2000
  },
  {
    name: '管理費',
    category: '家居物業',
    date: '2021-07-01',
    amount: 4580
  },
  {
    name: '小琉球潛水教練課程',
    category: '休閒娛樂',
    date: '2021-06-03',
    amount: 30000
  },
  {
    name: 'Youtube Premium',
    category: '休閒娛樂',
    date: '2020-12-15',
    amount: 399
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Record.create(records)
    .then(() => {
      db.close()
      console.log('recordSeeder done!')
    })
})