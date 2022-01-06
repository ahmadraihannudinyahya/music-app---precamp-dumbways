const route = require('./route');
const PlaylistHandler = require('./handler');

module.exports = (repositorys) =>{
  const playlistHandler = new PlaylistHandler(repositorys);
  return route(playlistHandler);
}