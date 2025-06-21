import Transaction from '../models/Transaction.js';
import { generatePDFReport } from '../utils/exportUtils.js';

export const downloadPDF = async (req, res) => {
  try {
    await generatePDFReport(req.user._id, res);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ message: 'PDF generation failed' });
    }
  }
};

export const getReport = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    const report = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = { income: 0, expense: 0 };
      }
      if (transaction.type === 'income') {
        acc[transaction.category].income += transaction.amount;
      } else {
        acc[transaction.category].expense += transaction.amount;
      }
      return acc;
    }, {});

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report' });
  }
};


export const getMonthlyReport = async (req, res) => {
  const userId = req.user._id;
  const data = await Transaction.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: { month: { $month: "$date" }, year: { $year: "$date" } },
        income: {
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
        },
        expense: {
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
        }
      }
    },
    {
      $project: {
        month: {
          $concat: [
            { $arrayElemAt: [
              [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
              "$_id.month"
            ] },
            " ",
            { $toString: "$_id.year" }
          ]
        },
        income: 1,
        expense: 1,
        _id: 0
      }
    },
    { $sort: { "month": 1 } }
  ]);
  res.json(data);
};


export const getCategoryReport = async (req, res) => {
  const userId = req.user._id;
  const data = await Transaction.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: { month: { $month: "$date" }, year: { $year: "$date" }, category: "$category", type: "$type" },
        amount: { $sum: "$amount" }
      }
    },
    {
      $project: {
        month: {
          $concat: [
            { $arrayElemAt: [
              [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
              "$_id.month"
            ] },
            " ",
            { $toString: "$_id.year" }
          ]
        },
        category: "$_id.category",
        type: "$_id.type",
        amount: 1,
        _id: 0
      }
    },
    { $sort: { "month": -1 } }
  ]);
  res.json(data);
};


export const getPieReport = async (req, res) => {
  const userId = req.user._id;
  const data = await Transaction.aggregate([
    { $match: { user: userId, type: "expense" } },
    {
      $group: {
        _id: "$category",
        value: { $sum: "$amount" }
      }
    },
    {
      $project: {
        name: "$_id",
        value: 1,
        _id: 0
      }
    }
  ]);
  res.json(data);
};
