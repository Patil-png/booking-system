import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/invoice/:bookingId', (req, res) => {
  const filePath = path.join(__dirname, '../invoices', `${req.params.bookingId}.pdf`);
  res.download(filePath);
});

export default router;
