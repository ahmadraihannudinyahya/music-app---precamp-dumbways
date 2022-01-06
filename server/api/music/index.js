const route = require('./route');
const MusicHandler = require('./handler');
module.exports = (repositorys) =>{
  const musicHandler = new MusicHandler(repositorys);
  return route(musicHandler);
}