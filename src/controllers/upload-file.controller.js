/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-import-module-exports
import moment from 'moment';
import multer from 'multer';

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
  cb(new Error('I don\'t have a clue!'));
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/avatar');
  },
  filename(req, file, cb) {
    // console.log(file);
    // if (!file) next();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 20,
    fileFilter
  }
});

export default upload;
