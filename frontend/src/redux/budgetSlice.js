import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/axios';

export const setBudget = createAsyncThunk('budget/set', async (budget) => {
  const res = await API.post('/budgets', budget);
  return res.data;
});

export const getBudget = createAsyncThunk('budget/get', async (month) => {
  const res = await API.get(`/budgets/${month}`);
  return res.data;
});

const budgetSlice = createSlice({
  name: 'budget',
  initialState: { budget: null },
  extraReducers: (builder) => {
    builder
      .addCase(setBudget.fulfilled, (state, action) => {
        state.budget = action.payload;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.budget = action.payload;
      });
  }
});

export default budgetSlice.reducer;
