const DB = require('../utils/db.js');

module.exports = {
  list: async ctx => {
    filmId = + ctx.params.id
    if (!isNaN(filmId)) {
      ctx.state.data = (await DB.query("SELECT * FROM reviews where reviews.filmId = ?", [filmId]))
    } else {
      ctx.state.data = {}
    }
  },

  add: async ctx =>{
    userId =  ctx.state.$wxInfo.userinfo.openId
    filmId = + ctx.request.body.filmId
    reviewContant = ctx.request.body.reviewContant || ''
    await DB.query('INSERT INTO reviews(userId,filmId,reviewContant) VALUES(?,?,?)', [userId, filmId, reviewContant])
  }
}