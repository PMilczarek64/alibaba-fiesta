import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listFiles = Router();

listFiles.get('/', (req, res) => {
  const files = fs.readdirSync(__dirname + '/../../storage/files');
  res.json({
    success: true,
    message: '✅ Files listed successfully',
    params: {
      files,
    },
  });
});

export default listFiles;