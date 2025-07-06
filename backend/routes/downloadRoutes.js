// 📁 backend/routes/downloadRoutes.js
import express from 'express';
import path from 'path';
const router = express.Router();

router.get('/invoice/:bookingId', (req, res) => {
  const filePath = path.join(__dirname, '../invoices', `${req.params.bookingId}.pdf`);
  res.download(filePath);
});

export default router;