import { configureStore } from '@reduxjs/toolkit';
import apiCallsReducer from './apiCallsSlice';

export default configureStore({
  reducer: {
    apiData: apiCallsReducer,
  },
});
