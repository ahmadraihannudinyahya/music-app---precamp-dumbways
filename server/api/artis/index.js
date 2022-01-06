const route = require('./route');
const ArtisHandler = require('./handler');

module.exports = (repositorys) =>{
  const artisHandler = new ArtisHandler(repositorys);
  return route(artisHandler);
}