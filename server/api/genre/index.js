const route = require('./route');
const GenreHandler = require('./handler');

module.exports = (repositorys) =>{
  const genreHandler = new GenreHandler(repositorys);
  return route(genreHandler);
}