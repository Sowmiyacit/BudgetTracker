import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  month: String, 
  amount: Number
}, { timestamps: true });

export default mongoose.model('Budget', budgetSchema);
