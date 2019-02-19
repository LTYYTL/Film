const DB = require('../utils/db.js');

module.exports = {
  list: async ctx =>{
    ctx.state.data = await DB.query("SELECT * FROM movies");
  },
  info:async ctx =>{
    filmId = + ctx.params.id
    if (!isNaN(filmId)){
      ctx.state.data = (await DB.query("SELECT * FROM movies where movies.id = ?", [filmId]))[0]
    }else{
      ctx.state.data = {}
    }
   
  }
}