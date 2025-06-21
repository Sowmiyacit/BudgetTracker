import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/anomalies', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const categories = ["Food", "Rent", "Salary", "Travel", "Shopping", "Entertainment", "Health", "Bills", "Other"];

    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const last3MonthsStart = new Date(today.getFullYear(), today.getMonth() - 3, 1);

    // Fetch past 3 months (excluding current month)
    const pastTransactions = await Transaction.find({
      user: userId,
      createdAt: { $gte: last3MonthsStart, $lt: currentMonthStart }
    });

    // Fetch current month
    const currentTransactions = await Transaction.find({
      user: userId,
      createdAt: { $gte: currentMonthStart }
    });

    const pastTotals = {};
    const pastCounts = {};
    const currentTotals = {};

    categories.forEach(cat => {
      pastTotals[cat] = 0;
      pastCounts[cat] = 0;
      currentTotals[cat] = 0;
    });

    // Aggregate past 3 months
    for (const txn of pastTransactions) {
      const cat = txn.category || 'Other';
      pastTotals[cat] += txn.amount;
      pastCounts[cat]++;
    }

    // Aggregate current month
    for (const txn of currentTransactions) {
      const cat = txn.category || 'Other';
      currentTotals[cat] += txn.amount;
    }

    const anomalies = [];

    for (const cat of categories) {
      const avgPast = pastCounts[cat] > 0 ? pastTotals[cat] / pastCounts[cat] : 0;
      const current = currentTotals[cat];

      if (avgPast > 0 && current > avgPast * 1.3) {
        anomalies.push({
          category: cat,
          average: avgPast,
          current: current,
          percentageIncreased: Math.round(((current - avgPast) / avgPast) * 100),
          message: `⚠ You are spending ${Math.round(((current - avgPast) / avgPast) * 100)}% more on ${cat} than usual.`
        });
      }
    }

    res.json({ anomalies });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error detecting anomalies' });
  }
});

export default router;
