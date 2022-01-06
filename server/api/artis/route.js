const express = require('express');
const midlewareFilehandler = require('../../midleware/midlewareFileHandlerMulter');

const route = (handler) =>{
  const router = express.Router();
  router.post('/artis',midlewareFilehandler, handler.addArtisHandler);
  router.get('/artis', handler.getViewsArtisListHandler);
  router.get('/artis/detail/:artisId', handler.getViewsDetailArtisHandler);
  return router
}

module.exports = route;