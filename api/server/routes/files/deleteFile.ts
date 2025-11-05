import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteFile = Router();

deleteFile.post('/', (req, res) => {
  const { filename } = req.body;
  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ success: false, message: 'Filename is required in body' });
  }

  const filePath = path.join(__dirname, '../../storage/files/', filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }
  const files = fs.rmSync(filePath, { force: true });
  res.json({
    success: true,
    message: '✅ Files deleted successfully',
    params: {
      files,
    },
  });
});

export default deleteFile;