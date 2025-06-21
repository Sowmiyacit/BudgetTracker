import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';

export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total Income
    const incomeAgg = await Transaction.aggregate([
      { $match: { user: userId, type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalIncome = incomeAgg[0]?.total || 0;

    // Total Expense
    const expenseAgg = await Transaction.aggregate([
      { $match: { user: userId, type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalExpense = expenseAgg[0]?.total || 0;

    // Total Budget
    const budgetAgg = await Budget.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalBudget = budgetAgg[0]?.total || 0;

    res.json({ totalIncome, totalExpense, totalBudget });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching summary', error: err.message });
  }
};