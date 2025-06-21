import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../redux/transactionSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from '../api/axios';

const categories = [
  "Food", "Rent", "Salary", "Travel", "Shopping", "Entertainment", "Health", "Bills", "Other"
];

const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    notes: '',
    date: ''
  });

  // NLP: Predict category from description
  const handleDescriptionChange = async (desc) => {
    setFormData(prev => ({ ...prev, notes: desc }));
    if (desc.length > 3) {
      try {
        const res = await axios.post('/classify', { description: desc });
        if (res.data && res.data.category) {
          setFormData(prev => ({ ...prev, category: res.data.category }));
        }
      } catch (err) {
        // ignore error
      }
    }
  };

  // NLP: Suggest description from category
  const handleCategoryChange = async (cat) => {
    setFormData(prev => ({ ...prev, category: cat }));
    if (cat) {
      try {
        const res = await axios.post('/classify', { category: cat });
        if (res.data && res.data.description) {
          setFormData(prev => ({ ...prev, notes: res.data.description }));
        }
      } catch (err) {
        // ignore error
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate Month string from date field
    let monthFormatted = '';
    if (formData.date) {
      const d = new Date(formData.date);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      monthFormatted = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    }

    const dataToSend = {
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      notes: formData.notes,
      date: formData.date,
      month: monthFormatted
    };

    dispatch(addTransaction(dataToSend)).then(() => navigate('/dashboard'));
  };

  const handleClear = () => {
    setFormData({
      amount: '',
      type: 'expense',
      category: '',
      notes: '',
      date: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Add Entry</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-xl">

          <div className="mb-5">
            <label className="block text-gray-600 mb-1 font-medium">Amount</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 mb-1 font-medium">Date</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 mb-1 font-medium">Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 mb-1 font-medium">Category</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              value={formData.category}
              onChange={e => handleCategoryChange(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 mb-1 font-medium">Description</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              type="text"
              placeholder="Enter description"
              value={formData.notes}
              onChange={e => handleDescriptionChange(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-8">
            <button type="submit" className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition">
              Add
            </button>
            <button type="button" className="w-1/2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-3 rounded-lg shadow transition" onClick={handleClear}>
              Clear
            </button>
          </div>

        </form>

        <button
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition"
          onClick={() => navigate('/dashboard')}
        >
          View Transactions
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;