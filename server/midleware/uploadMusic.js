const multer = require('multer');

module.exports = (imageFile) => {
  // initialization multer diskstorage
  // make destination file for upload
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads/music`); //file storage location
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '')); // rename filename by date now + original filename
    },
  }); 

  // function for file filter based on extension
  // const fileFilter = function (req, file, cb) {
  //   if (file.fieldname === imageFile) {
  //     if (!file.originalname.match(/\.(mp3|MP3)$/)) {
  //       req.fileValidationError = {
  //         message: 'Only image files are allowed!',
  //       };
  //       return cb(new Error('Only image files are allowed!'), false);
  //     }
  //   }
  //   cb(null, true);
  // };

  const sizeInMB = 10;
  const maxSize = sizeInMB * 1000 * 1000; // Maximum file size in MB

  // generate multer instance for upload include storage, validation and max file size
  const upload = multer({
    storage,
    // fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([{name : imageFile[0], maxCount : 1}, {name : imageFile[1], maxCount : 1}]);
  
  // middleware handler
  return (req, res, next) => {
    upload(req, res, function (err) {
      // show an error if validation failed
      if (req.fileValidationError) {
        req.session.message = {
          type: 'danger',
          message: 'Please select files to upload',
        };
        return res.redirect(req.originalUrl);
      }

      // show an error if file doesn't provided in req
      // if (!req.file && !err) {
      //   req.session.message = {
      //     type: 'danger',
      //     message: 'Please select files to upload',
      //   };
      //   return res.redirect(req.originalUrl);
      // }

      // show an error if it exceeds the max size
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          req.session.message = {
            type: 'danger',
            message: 'Error, Max file sized 10MB',
          };
          return res.redirect(req.originalUrl);
        }
        req.session.message = {
          type: 'danger',
          message: err,
        };
        console.log('error', err);
        return res.redirect(req.originalUrl);
      }

      // if okay next to controller
      // in the controller we can access using req.file
      return next();
    });
  };
};
