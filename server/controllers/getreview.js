const DB = require('../utils/db.js');

module.exports = {
  all: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM reviews")
  },
  
  info: async ctx => {
    reviewId = + ctx.params.id
    if (!isNaN(reviewId)) {
      ctx.state.data = (await DB.query("SELECT * FROM reviews where reviews.id = ?", [reviewId]))
    } else {
      ctx.state.data = {}
    }
  },

  findUser: async ctx => {
    userId = ctx.state.$wxInfo.userinfo.openId
    ctx.state.data = (await DB.query("SELECT * FROM reviews where reviews.userId = ?", [userId]))
  }
 


}