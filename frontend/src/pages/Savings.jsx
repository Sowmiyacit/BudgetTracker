import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Header from '../components/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SavingPredict = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const res = await axios.get('/savings/predict');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPrediction();
  }, []);

  if (!data) return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <div className="main-card text-center text-lg">Loading prediction...</div>
    </div>
  );


  const chartData = [
    ...(data.lastMonths || []), 
    { month: "Next", savings: data.predictedSavings, predicted: true }
  ];

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <div className="main-card w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Savings Predictor</h2>
        <div className="space-y-4 text-lg mb-6">
          <div>Total Income (last 90 days): ₹{data.totalIncome}</div>
          <div>Total Expense (last 90 days): ₹{data.totalExpense}</div>
          <div>Avg Monthly Expense: ₹{data.avgMonthlyExpense}</div>
          <div className="font-semibold text-green-600">
            Predicted Savings Next Month: ₹{data.predictedSavings}
          </div>
          {data.alertMessage && (
            <div className="text-red-600 font-bold">{data.alertMessage}</div>
          )}
        </div>
        {/* Visualization */}
        <div className="bg-gray-50 rounded-xl shadow p-4">
          <h3 className="font-bold mb-2 text-gray-700">Savings Trend (AI Prediction)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="savings"
                fill="#36A2EB"
                name="Actual Savings"
                isAnimationActive={false}
       
                label={({ index }) =>
                  chartData[index].predicted ? "Predicted" : ""
                }
              >
                {chartData.map((entry, idx) => (
                  <rect
                    key={idx}
                    x={0}
                    y={0}
                    width={0}
                    height={0}
                    fill={entry.predicted ? "#00C49F" : "#36A2EB"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SavingPredict;
