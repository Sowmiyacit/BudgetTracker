import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setShowProfile(false);
    navigate('/login');
  };

  return (
    <header className="w-full bg-gray-200 shadow flex items-center justify-between px-8 py-4 mb-8 rounded-xl">
      <nav className="flex items-center gap-8">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `font-semibold transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `font-semibold transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`
          }
        >
          Add Entry
        </NavLink>
        <NavLink
          to="/budget"
          className={({ isActive }) =>
            `font-semibold transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`
          }
        >
          Budget
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `font-semibold transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/savings-predictor"
          className={({ isActive }) =>
            `font-semibold transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`
          }
        >
          Saving Predictor
        </NavLink>
      </nav>
      <div className="flex items-center gap-4 relative">
        <div
          className="bg-blue-100 rounded-full p-2 cursor-pointer"
          onClick={() => setShowProfile((prev) => !prev)}
        >
          <FiUser className="text-blue-600" size={22} />
        </div>
        {showProfile && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg px-4 py-3 z-10 min-w-[150px] text-center">
            <span className="text-gray-700 font-semibold block mb-3">{username || 'User'}</span>
            <button
              onClick={handleLogout}
              className="bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg hover:bg-red-200 transition w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;