import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from '../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';  // ✅ Import the plugin correctly

const Export = () => {
  const [report, setReport] = useState({});

  useEffect(() => {
    axios.get('/reports').then(res => setReport(res.data));
  }, []);

  const handlePDFDownload = () => {
    if (!report || Object.keys(report).length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Financial Report', 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);

    const tableColumn = ["Category", "Income", "Expense"];
    const tableRows = [];

    Object.keys(report).forEach((cat) => {
      const row = [
        cat,
        report[cat].income || 0,
        report[cat].expense || 0
      ];
      tableRows.push(row);
    });

    // Totals
    const totalIncome = Object.values(report).reduce((sum, r) => sum + (Number(r.income) || 0), 0);
    const totalExpense = Object.values(report).reduce((sum, r) => sum + (Number(r.expense) || 0), 0);
    tableRows.push(["Total", totalIncome, totalExpense]);

    // ✅ Correct usage of autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('financial_report.pdf');
  };

  const handleCSVDownload = () => {
    if (!report || Object.keys(report).length === 0) return;
    const headers = ['Category', 'Income', 'Expense'];
    const rows = Object.keys(report).map(cat => [
      cat,
      report[cat].income,
      report[cat].expense
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'financial_report.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const totalIncome = Object.values(report).reduce((sum, r) => sum + (Number(r.income) || 0), 0);
  const totalExpense = Object.values(report).reduce((sum, r) => sum + (Number(r.expense) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-blue-600 text-center mb-8">Export Reports</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-4 border text-gray-700 text-lg">Category</th>
                <th className="p-4 border text-gray-700 text-lg">Income</th>
                <th className="p-4 border text-gray-700 text-lg">Expense</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(report).length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-400">
                    No data available.
                  </td>
                </tr>
              ) : (
                Object.keys(report).map((cat, idx) => (
                  <tr key={cat} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 border text-center font-medium">{cat}</td>
                    <td className="p-4 border text-center text-green-600 font-semibold">{report[cat].income}</td>
                    <td className="p-4 border text-center text-red-500 font-semibold">{report[cat].expense}</td>
                  </tr>
                ))
              )}
            </tbody>
            {Object.keys(report).length > 0 && (
              <tfoot>
                <tr className="bg-blue-50 font-bold">
                  <td className="p-4 border text-center">Total</td>
                  <td className="p-4 border text-center text-green-700">{totalIncome}</td>
                  <td className="p-4 border text-center text-red-700">{totalExpense}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
            onClick={handlePDFDownload}
          >
            Download PDF Report
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
            onClick={handleCSVDownload}
          >
            Download Excel (CSV)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Export;
