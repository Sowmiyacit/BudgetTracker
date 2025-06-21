import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionReducer from './transactionSlice';
import budgetReducer from './budgetSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    budget: budgetReducer,
  },
});
