const DB = require('../utils/db.js');

module.exports = {
  info: async ctx => {
    userId = ctx.params.id
    ctx.state.data = (await DB.query("SELECT * FROM users where users.id = ?", [userId]))
  },

  add: async ctx => {
    userId = ctx.state.$wxInfo.userinfo.openId
    userName = ctx.request.body.userName
    userImage = ctx.request.body.userImage || ''
    await DB.query('INSERT INTO users(id,userName,userImage) VALUES(?,?,?)', [userId, userName, userImage])
  },

}