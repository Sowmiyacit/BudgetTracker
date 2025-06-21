import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Export from './pages/Export';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import AddTransaction from './pages/AddTransaction';
import SavingPredict from './pages/Savings';

const App = () => {
  // No Redux user check here!
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes: these pages check token themselves */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/export" element={<Export />} />
        <Route path="/savings-predictor" element={<SavingPredict />} />

        {/* Catch-all: redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;