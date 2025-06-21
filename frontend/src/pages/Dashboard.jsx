import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { fetchTransactions } from '../redux/transactionSlice';
import axios from '../api/axios';
import Header from '../components/Header';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F", "#FF6384", "#36A2EB"];

function getRandomMonthYear() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[Math.floor(Math.random() * months.length)];
  const year = 2022 + Math.floor(Math.random() * 5); // 2022-2026
  return `${month} ${year}`;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [summary, setSummary] = useState({});
  const [monthly, setMonthly] = useState([]);
  const [category, setCategory] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [anomalies, setAnomalies] = useState([]);
  const [loadingAnomalies, setLoadingAnomalies] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Token check before rendering
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (checkingAuth) return;
    dispatch(fetchTransactions());
    axios.get('/summary').then(res => setSummary(res.data));
    axios.get('/reports/monthly').then(res => setMonthly(res.data));
    axios.get('/reports/category').then(res => setCategory(res.data));
    axios.get('/reports/pie').then(res => setPieData(res.data));
    axios.get('/budget')
      .then(res => {
        setBudgets(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setBudgets([]));

    axios.get('/ai/anomalies')
      .then(res => setAnomalies(res.data.anomalies))
      .catch(() => setAnomalies([]))
      .finally(() => setLoadingAnomalies(false));
  }, [dispatch, checkingAuth]);

  if (checkingAuth) return null;
 // ...existing code...

// Collect all months from all sources
const allMonthsSet = new Set([
  ...monthly.map(m => m.month),
  ...category.map(c => c.month),
  ...pieData.map(p => p.month),
  ...budgets.map(b => b.month)
]);
const allMonths = Array.from(allMonthsSet).filter(Boolean);

// Optional: Sort months chronologically if format is "Jun 2025"
function parseMonthYear(str) {
  if (!str) return 0;
  const [mon, year] = str.split(' ');
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return parseInt(year) * 100 + months.indexOf(mon);
}
allMonths.sort((a, b) => parseMonthYear(a) - parseMonthYear(b));

// ...existing code...
  function normalizeMonth(m) {
    return (m || '').toLowerCase().replace(/\s+/g, '');
  }

  const currentBudget = Array.isArray(budgets) && budgets.length > 0 && selectedMonth
    ? (budgets.find(b => normalizeMonth(b.month) === normalizeMonth(selectedMonth))?.amount || 0)
    : 0;

  const filteredMonthly = selectedMonth
    ? monthly.filter(m => normalizeMonth(m.month) === normalizeMonth(selectedMonth))
    : monthly;
  const filteredCategory = selectedMonth
    ? category.filter(c => normalizeMonth(c.month) === normalizeMonth(selectedMonth))
    : category;
  const filteredPieData = selectedMonth
    ? pieData.filter(c => normalizeMonth(c.month) === normalizeMonth(selectedMonth))
    : pieData;

  const monthSummary = filteredMonthly.length
    ? filteredMonthly[0]
    : { income: 0, expense: 0 };

  const budgetStatus = monthSummary.expense > currentBudget
    ? "Over Budget"
    : "Under Budget";

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <div className="main-card w-full max-w-6xl">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Dashboard</h2>

        <div className="mb-6 flex gap-4 items-center">
          <label className="font-semibold text-gray-700">Select Month:</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            <option value="">All</option>
            {allMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 font-medium mb-2">Total Income</span>
            <span className="text-green-500 text-2xl font-bold">${monthSummary.income || 0}</span>
          </div>
          <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 font-medium mb-2">Total Expenses</span>
            <span className="text-red-500 text-2xl font-bold">${monthSummary.expense || 0}</span>
          </div>
          <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 font-medium mb-2">Budget Set</span>
            <span className="text-blue-600 text-2xl font-bold">${currentBudget}</span>
          </div>
          <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 font-medium mb-2">Budget Status</span>
            <span className={`text-lg font-bold ${budgetStatus === "Over Budget" ? "text-red-600" : "text-green-600"}`}>
              {budgetStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 rounded-xl shadow p-6">
            <h3 className="font-bold mb-4 text-gray-700">Income vs Expenses</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={filteredMonthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#00C49F" />
                <Bar dataKey="expense" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center">
            <h3 className="font-bold mb-4 text-gray-700">Expenses Pie Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={filteredPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {filteredPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overspending AI Alerts */}
        <div className="bg-gray-50 rounded-xl shadow p-6 mb-8">
          <h3 className="font-bold mb-4 text-gray-700">📊 Overspending Anomaly Detection</h3>
          {loadingAnomalies ? (
            <p>Loading...</p>
          ) : anomalies.length === 0 ? (
            <p className="text-green-600">✅ No overspending detected!</p>
          ) : (
            <ul className="space-y-3">
              {anomalies.map((alert, idx) => (
                <li key={idx} className="p-3 bg-red-100 rounded shadow">
                  ⚠ You are spending {alert.percentage}% more on <strong>{alert.category}</strong> this month.
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl shadow p-6">
          <h3 className="font-bold text-gray-700 mb-4">Expenses by Category</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left text-gray-600">Month</th>
                  <th className="p-3 text-left text-gray-600">Category</th>
                  <th className="p-3 text-left text-gray-600">Amount</th>
                  <th className="p-3 text-left text-gray-600">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-400">
                      No data available.
                    </td>
                  </tr>
                ) : (
                  filteredCategory.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3">{console.log(row)|| "Jun 2026"}</td>
                      <td className="p-3">{row.category}</td>
                      <td className="p-3">${row.amount}</td>
                      <td className="p-3">{row.type}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;