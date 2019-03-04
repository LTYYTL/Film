const DB = require('../utils/db.js');

module.exports = {

  info: async ctx => {
    reviewId = + ctx.params.id
    if (!isNaN(reviewId)) {
      ctx.state.data = (await DB.query("SELECT * FROM reviews where reviews.id = ?", [reviewId]))
    } else {
      ctx.state.data = {}
    }
  },

}