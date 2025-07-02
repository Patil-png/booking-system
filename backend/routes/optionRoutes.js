// routes/optionRoutes.js
import express from 'express';
import {
  getOptions,
  createOption,
  updateOption,
  deleteOption,
} from '../controllers/optionController.js';

const router = express.Router();

router.get('/', getOptions);
router.post('/', createOption);
router.put('/:id', updateOption);
router.delete('/:id', deleteOption);

export default router;
