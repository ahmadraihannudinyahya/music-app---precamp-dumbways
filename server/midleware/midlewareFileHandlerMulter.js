const multer = require('multer');

const midlewareFilehandler = multer().any();

module.exports = midlewareFilehandler;