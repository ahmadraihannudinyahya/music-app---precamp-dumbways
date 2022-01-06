const route = require('./route');
const LikesHandler = require('./handler');

module.exports = (repositorys) =>{
  const likesHandler = new LikesHandler(repositorys);
  return route(likesHandler);
}