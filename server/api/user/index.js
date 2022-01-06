const route = require('./route');
const UserHandler = require('./handler');

module.exports = (repository) =>{
  const userHandler = new UserHandler(repository);
  return route(userHandler);
}