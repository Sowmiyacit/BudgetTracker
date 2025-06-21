import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-black-100">
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <h2 className="text-2xl font-extrabold text-blue-700 p-6 border-b drop-shadow-lg">💰 Budget Tracking App</h2>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/dashboard" className="block py-2 px-4 rounded hover:bg-blue-200">Dashboard</NavLink>
          <NavLink to="/budget" className="block py-2 px-4 rounded hover:bg-blue-200">Budget</NavLink>
          <NavLink to="/add" className="block py-2 px-4 rounded hover:bg-blue-200">Add Transaction</NavLink>
          <NavLink to="/reports" className="block py-2 px-4 rounded hover:bg-blue-200">Reports</NavLink>
        </nav>
        <button onClick={handleLogout} className="m-4 p-2 bg-blue-500 text-white rounded">Logout</button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
