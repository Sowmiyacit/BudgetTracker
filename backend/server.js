import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import classifyRoutes from './routes/classifyRoutes.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';
import savingsRoute from './routes/savingRoute.js';
import aiRoutes from './routes/aiRoutes.js';
dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://budget-tracker-git-main-sowmiyas-projects-0d4767e1.vercel.app' // <-- replace with your deployed frontend URL if any
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/classify', classifyRoutes);
app.use('/api/savings', savingsRoute);
app.use('/api/ai', aiRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.log(err));
