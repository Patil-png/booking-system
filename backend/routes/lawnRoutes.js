import express from 'express';
import { getLawnPrice } from '../controllers/lawnController.js';
const router = express.Router();
router.post('/price', getLawnPrice);
export default router;