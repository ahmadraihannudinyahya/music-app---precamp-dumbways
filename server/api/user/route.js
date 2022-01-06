const express = require('express');

const route = (handler) =>{
  const router = express.Router();
  router.get('/user/register', handler.getViewRegisterHandler);
  router.post('/user/register',  handler.registerUserHandler);
  router.get('/user/login', handler.getViewLoginHandler);
  router.post('/user/login', handler.loginUserHandler);
  router.get('/user/logout', handler.logoutUserHandler);
  return router
}

module.exports = route;