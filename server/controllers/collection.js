const DB = require('../utils/db.js');
module.exports = {

  add: async ctx => {
    userId = ctx.state.$wxInfo.userinfo.openId
    reviewId = +ctx.request.body.reviewId
    await DB.query('INSERT INTO collection(userId,reviewId) VALUES(?,?)', [userId, reviewId])
  },

  decide: async ctx => {
    userId = ctx.state.$wxInfo.userinfo.openId
    reviewId = +ctx.params.id
    ctx.state.data = (await DB.query("SELECT * FROM collection where collection.userId = ? and collection.reviewId = ?", [userId, reviewId]))[0]
  },

  userDecide: async ctx => {
      userId = ctx.state.$wxInfo.userinfo.openId
      ctx.state.data = (await DB.query("SELECT * FROM collection where collection.userId = ? ", [userId]))
  },
}