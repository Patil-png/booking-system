    import express from 'express';
    import { addBlockedDate, getBlockedDates, deleteBlockedDate } from '../controllers/blockedDateController.js';

    const router = express.Router();

    router.post('/', addBlockedDate);         // POST /api/blocked-dates
    router.get('/', getBlockedDates);         // GET  /api/blocked-dates?type=Room
    router.delete('/:id', deleteBlockedDate);

    export default router;
