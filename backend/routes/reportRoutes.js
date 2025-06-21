import express from 'express';
import { getReport } from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { downloadPDF } from '../controllers/reportController.js';
import {
  getMonthlyReport,
  getCategoryReport,
  getPieReport
} from '../controllers/reportController.js';
const router = express.Router();

router.get('/monthly', protect, getMonthlyReport);
router.get('/category', protect, getCategoryReport);
router.get('/pie', protect, getPieReport);
router.get('/', protect, getReport);
router.get('/download/pdf', protect, downloadPDF);
export default router;
