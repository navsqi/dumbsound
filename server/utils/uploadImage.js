const multer = require('multer');
const { appError } = require('../utils/appError');

exports.uploadSingle = (table, fileInput) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
      const imageFormat = file.mimetype.split('/')[1];
      const fileName = `${table}-${Date.now()}.${imageFormat}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    // File format
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const uploadConfig = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5000000,
    },
  });

  return (req, res, next) => {
    const upload = uploadConfig.single(fileInput);

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        if (err.code === 'LIMIT_FILE_SIZE') return appError(res, 400, 'File too large.');
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.send(err);
      }
      // Everything went fine.
      return next();
    });
  };
};
