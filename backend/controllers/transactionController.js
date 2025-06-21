import Transaction from '../models/Transaction.js';


import { categorizeTransaction } from '../services/nlpService.js';

export const addTransaction = async (req, res) => {
  let month = req.body.month;
  if (!month && req.body.date) {
    const d = new Date(req.body.date);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    month = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  }


  const predictedCategory = categorizeTransaction(req.body.description);

  const transaction = await Transaction.create({
    ...req.body,
    category: predictedCategory,
    user: req.user._id,
    month
  });

  res.json(transaction);
};

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });
  res.json(transactions);
};

export const deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: 'Transaction deleted' });
};


export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const updated = await Transaction.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!updated) {
    return res.status(404).json({ message: 'Transaction not found' });
  }
  res.json(updated);
};
