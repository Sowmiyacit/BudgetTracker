import express from 'express';
import { setBudget, getBudget, getAllBudgets } from '../controllers/budgetController.js';
import { protect } from '../middlewares/authMiddleware.js';
import Transaction from '../models/Transaction.js';  // Add this import

const router = express.Router();

// Existing routes
router.post('/', protect, setBudget);
router.get('/', protect, getAllBudgets);
router.get('/:month', protect, getBudget);




export default router;

