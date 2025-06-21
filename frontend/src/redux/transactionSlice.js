import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/axios';

export const fetchTransactions = createAsyncThunk('transactions/fetch', async () => {
  const res = await API.get('/transactions');
  return res.data;
});

export const addTransaction = createAsyncThunk('transactions/add', async (transaction) => {
  const res = await API.post('/transactions', transaction);
  return res.data;
});

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/transactions/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const transactionSlice = createSlice({
  name: 'transaction',
  initialState: { transactions: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const idx = state.transactions.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) {
          state.transactions[idx] = action.payload;
        }
      });
  }
});

export default transactionSlice.reducer;
