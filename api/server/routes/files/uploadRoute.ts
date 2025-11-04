import { Router } from 'express';
import fileStorage from '../../storage/createStorage.js';

const uploadRoute = Router();

uploadRoute.post('/', fileStorage.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  res.json({
    success: true,
    message: 'File uploaded successfully',
    fileUrl: `/uploads/${req.file.filename}`,
  });
});

export default uploadRoute;