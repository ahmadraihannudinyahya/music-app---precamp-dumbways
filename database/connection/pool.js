const mysql2 = require('mysql2');

pool = mysql2.createPool({
  connectionLimit : 10,
  host            : '192.168.56.101',
  user            : 'developer',
  password        : 'developer',
  database        : 'db_music'
}).promise();

module.exports = pool;