const express = require('express');

const route = (handler) =>{
  const router = express.Router();
  router.get('/playlist', handler.getViewsPlaylistHandler);
  router.post('/playlist', handler.addPlaylistHandler);
  router.post('/playlist/music', handler.addMusicInPlaylist);
  router.get('/playlist/:id', handler.getViewsDetailPlaylistHandler);
  router.post('/playlist/edit/:id', handler.editPlaylistHandler);
  router.get('/playlist/delete/:id', handler.deletePlaylistHandler);
  router.get('/playlist/delete/:playlistId/music/:musicId', handler.deleteMusicInPlaylistHandler);
  return router
};

module.exports = route;