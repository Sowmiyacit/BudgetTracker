import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Header from '../components/Header';

const AnomalyAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const res = await axios.get('/api/ai/anomalies');
        setAlerts(res.data.anomalies);
      } catch (err) {
        console.error('Failed to fetch anomalies', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnomalies();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gray-400 flex flex-col items-center py-10">
      <Header />
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">📊 Overspending Anomaly Detection</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : alerts.length === 0 ? (
          <p className="text-green-600 text-center">✅ No overspending detected. You are on track!</p>
        ) : (
          <ul className="space-y-4">
            {alerts.map((alert, idx) => (
              <li key={idx} className="bg-red-100 p-4 rounded-lg shadow">
                ⚠ You are spending {alert.percentage}% more on <strong>{alert.category}</strong> this month than usual!
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnomalyAlert;
