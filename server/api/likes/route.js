const express = require('express');

const route = (handler) =>{
  const router = express.Router();
  router.put('/like/music/:musicId', handler.putMusicLikes)
  return router
}

module.exports = route;