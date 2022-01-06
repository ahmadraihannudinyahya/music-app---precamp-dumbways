const http = require('http');
const createServer = require('./server/createServer');

(()=>{
  const port = 3000;
  const app = createServer()
  const server = http.createServer(app);
  server.listen(port);
  console.log(`Music app listening at http://localhost:${port}`)
})();

