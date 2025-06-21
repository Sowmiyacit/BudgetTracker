import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/axios';

// AsyncThunk for Register
export const register = createAsyncThunk('auth/register', async (userData) => {
  const res = await API.post('/auth/register', userData);
  return res.data;
});

// AsyncThunk for Login
export const login = createAsyncThunk('auth/login', async (userData) => {
  const res = await API.post('/auth/login', userData);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: JSON.parse(localStorage.getItem('user')) || null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      });
  }
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
