const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    console.log('LocalStrategy runs')
    User.findOne({ email })
      .then(user => {
        if (!user) {
          console.log('!user')
          return done(null, false, req.flash('warning_msg', 'This email is not registered.'))
          console.log('req.flash.message:', req.flash)
        }
        if (user.password !== password) {
          console.log('!password')
          return done(null, false, req.flash('warning_msg', 'Incorrect password.'))
          console.log('req.flash for wrong pwd')
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}