import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from '../api/axios';

const Budget = () => {
  const [formData, setFormData] = useState({ month: '', amount: '' });
  const [budgets, setBudgets] = useState([]);
  const [filters, setFilters] = useState({ month: '', sort: '' });

  // Fetch budgets from backend on load
  useEffect(() => {
    axios.get('/budget')
      .then(res => setBudgets(res.data))
      .catch(() => setBudgets([]));
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert "YYYY-MM" to "Mon YYYY"
    let monthFormatted = '';
    if (formData.month) {
      const [year, month] = formData.month.split('-');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      monthFormatted = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    }

    const dataToSend = {
      month: monthFormatted,
      amount: Number(formData.amount)
    };

    await axios.post('/budget', dataToSend);

    // Refresh budgets after adding new one
    axios.get('/budget')
      .then(res => setBudgets(res.data))
      .catch(() => setBudgets([]));

    // Clear form after submit
    setFormData({ month: '', amount: '' });
  };

  // Filtering and sorting logic
  let filtered = budgets.filter(b =>
    (!filters.month || b.month === formatMonth(filters.month))
  );

  if (filters.sort === 'amount') {
    filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  }

  // Convert YYYY-MM to "Mon YYYY"
  function formatMonth(m) {
    if (!m) return '';
    if (m.includes('-')) {
      const [year, month] = m.split('-');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    }
    return m;
  }

  return (
    <div className=" min-h-screen  bg-gray-400 ">
      <Header />
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Budget</h2>

        {/* Filter & Sort */}
        <div className="flex flex-wrap gap-4 mb-6 bg-gray-50 p-4 rounded-xl shadow">
          <input
            type="month"
            value={filters.month}
            onChange={e => setFilters({ ...filters, month: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Filter by Month"
          />
          <select
            value={filters.sort}
            onChange={e => setFilters({ ...filters, sort: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Sort</option>
            <option value="amount">Amount (High to Low)</option>
          </select>
        </div>

        {/* Budget Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow mb-8 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Month</label>
            <input
              type="month"
              value={formData.month}
              onChange={e => setFormData({ ...formData, month: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Amount"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
          >
            Add Budget
          </button>
        </form>

        {/* Budget Table */}
        <div className="bg-gray-50 rounded-xl shadow p-6">
          <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left text-gray-600">Month</th>
                <th className="p-3 text-left text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-6 text-center text-gray-400">
                    No data available.
                  </td>
                </tr>
              ) : (
                filtered.map((b, idx) => (
                  <tr key={b._id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3">{b.month}</td>
                    <td className="p-3">${b.amount.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Budget;