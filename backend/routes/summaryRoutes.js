import express from 'express';
import { getSummary } from '../controllers/summaryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getSummary);

export default router;