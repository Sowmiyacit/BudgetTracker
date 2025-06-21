import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['income', 'expense'] },
  category: String,
  amount: Number,
  date: Date,
  notes: String,
  month: String // <-- Add this line
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
