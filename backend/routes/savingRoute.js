import express from 'express';
import Transaction from '../models/Transaction.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/predict', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    
    const today = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(today.getDate() - 90);

 
    const transactions = await Transaction.find({
      user: userId,
      createdAt: { $gte: ninetyDaysAgo }
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(txn => {
      if (txn.type === 'income') {
        totalIncome += txn.amount;
      } else if (txn.type === 'expense') {
        totalExpense += txn.amount;
      }
    });

   
    const avgMonthlyExpense = Math.round(totalExpense / 3);
    const predictedSavings = totalIncome - avgMonthlyExpense;

    let alertMessage = '';
    if (predictedSavings < 1000) {
      alertMessage = '⚠️ Warning: You might overspend next month.';
    }

    res.json({
      totalIncome,
      totalExpense,
      avgMonthlyExpense,
      predictedSavings,
      alertMessage
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating savings prediction" });
  }
});

export default router;
