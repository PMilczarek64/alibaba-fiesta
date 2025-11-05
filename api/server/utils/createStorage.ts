import multer from 'multer';
import storageDir from './storageDir.js';

const storage = multer.diskStorage({
  destination: storageDir,
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  },
});

const fileStorage = multer({ storage });

export default fileStorage;