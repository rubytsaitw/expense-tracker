const bcrypt = require('bcryptjs')

const Record = require('../record')
const User = require('../user')

const db = require('../../config/mongoose')

const SEED_USERS = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  hasRecordId: [1, 2, 3]
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  hasRecordId: [4, 5, 6]
}]

const recordList = [
  {
    id: 1,
    name: '朋友聚會',
    category: '餐飲食品',
    date: '2020-12-09',
    amount: 800,
    merchant: '金色三麥'
  },
  {
    id: 2,
    name: '情人節晚餐',
    category: '餐飲食品',
    date: '2021-07-06',
    amount: 2000,
    merchant: 'THE WANG'
  },
  {
    id: 3,
    name: '管理費',
    category: '家居物業',
    date: '2021-07-01',
    amount: 4580
  },
  {
    id: 4,
    name: '小琉球潛水教練課程',
    category: '休閒娛樂',
    date: '2021-06-03',
    amount: 30000,
    merchant: '蹼客基地'
  },
  {
    id: 5,
    name: 'Youtube Premium',
    category: '休閒娛樂',
    date: '2020-12-15',
    amount: 399,
    merchant: 'Youtube'
  },
  {
    id: 6,
    name: '程式課程',
    category: '其他',
    date: '2020-05-03',
    amount: 66000,
    merchant: 'ALPHA Camp'
  }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, (SEED_USER, i) => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash =>
        User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
      .then(user => {
        const userId = user._id
        const records = recordList.filter(record => SEED_USER.hasRecordId.includes(record.id))
        records.forEach(record => { record.userId = userId })
        return Record.create(records)
      })
  }))
    .then(() => {
      console.log('Record Seeder done.')
      process.exit()
    })
    .catch(error => console.log(error))
})