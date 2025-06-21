import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch login and wait for result
    const resultAction = await dispatch(login(formData));
    // If login is successful, store token and navigate
    if (login.fulfilled.match(resultAction)) {
      const { token } = resultAction.payload;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm mb-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="font-bold text-gray-700 text-lg">Budget Tracker</span>
        </div>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={() => navigate('/Register')}
        >
          Sign up
        </button>
      </div>

      {/* Login Card */}
      <div className="bg-white w-full max-w-md mx-auto rounded-2xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Log in</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email address</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-400">♡</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="cursor-pointer hover:underline">Forget password?</span>
          <span>
            <span>Sign up etc</span>
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1"
              onClick={() => navigate('/register')}
            >
              Sign up
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;