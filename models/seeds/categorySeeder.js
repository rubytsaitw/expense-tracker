const Category = require('../category')
const db = require('../../config/mongoose')

const categories = [
  {
    name: '家居物業',
    icon: 'https://fontawesome.com/icons/home?style=solid'
  },
  {
    name: '交通出行',
    icon: 'https://fontawesome.com/icons/shuttle-van?style=solid'
  },
  {
    name: '休閒娛樂',
    icon: 'https://fontawesome.com/icons/grin-beam?style=solid'
  },
  {
    name: '餐飲食品',
    icon: 'https://fontawesome.com/icons/utensils?style=solid'
  },
  {
    name: '其他',
    icon: 'https://fontawesome.com/icons/pen?style=solid'
  },
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Category.create(categories)
    .lean()
    .then(() => {
      db.close()
      console.log('categorySeeder done!')
    })
})