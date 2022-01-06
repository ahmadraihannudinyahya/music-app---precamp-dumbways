const express = require('express');
const router = express.Router();
const uploadMusic = require('../../midleware/uploadMusic');
const uploadImage = require('../../midleware/uploadImage');


const route = (handler) =>{
  router.get('/music/add', handler.getAddMusicViews);
  router.get('/music/detail/:id', handler.getMusicDetailByIdHandler);
  router.post('/music/add', uploadMusic(['music', 'cover-music']), uploadImage('cover-music'), handler.addMusicHandler);
  router.get('/music', handler.getViewsAllMusicHandler);
  return router
}

module.exports = route;