import express from 'express';
import { getRoomTypes, getRoomPrice } from '../controllers/roomController.js';
const router = express.Router();
router.get('/types', getRoomTypes);
router.post('/price', getRoomPrice);
export default router;
