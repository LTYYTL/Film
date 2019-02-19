const DB = require('../utils/db.js');

module.exports = {
  info: async ctx => {
    userId = + ctx.params.id
    if (!isNaN(userId)) {
      ctx.state.data = (await DB.query("SELECT * FROM users where users.id = ?", [userId]))
    } else {
      ctx.state.data = {}
    }
  },
  
}