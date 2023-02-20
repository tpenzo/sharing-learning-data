import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice.js';

export default configureStore({
  reducer: {
    auth: AuthSlice
  },
});