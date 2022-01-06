const express = require('express');

const route = (handler) =>{
  const router = express.Router();
  router.post('/genre', handler.addGenreHandler)
  router.get('/genre', handler.getViewsGenreListHandler)
  router.get('/genre/detail/:genreId', handler.getViewsGenreDetailHandler)
  return router
}

module.exports = route;