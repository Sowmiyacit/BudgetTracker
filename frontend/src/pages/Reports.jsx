import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, LineChart } from 'recharts';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FF6384", "#FFBB28", "#36A2EB"];

const Reports = () => {
  const [pieData, setPieData] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/reports/pie').then(res => setPieData(res.data));
    axios.get('/reports/monthly').then(res => setMonthly(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <div className="max-w-6xl mx-auto mt-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Reports</h2>
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            onClick={() => navigate('/export')}
          >
            Export
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart Card */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <h3 className="font-bold mb-4 text-gray-700 text-lg">Spending By Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Bar/Line Chart Card */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <h3 className="font-bold mb-4 text-gray-700 text-lg">Savings Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#0088FE" />
                <Bar dataKey="expense" fill="#FF8042" />
                <Line type="monotone" dataKey="income" stroke="#0088FE" />
                <Line type="monotone" dataKey="expense" stroke="#FF8042" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;