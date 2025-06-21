import Budget from '../models/Budget.js';

export const setBudget = async (req, res) => {
  const { month, amount } = req.body;

  try {
    let budget = await Budget.findOneAndUpdate(
      { user: req.user._id, month },
      { amount, month, user: req.user._id },
      { new: true, upsert: true }
    );
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBudget = async (req, res) => {
  const { month } = req.params;

  try {
    const budget = await Budget.findOne({ user: req.user._id, month });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
