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
}