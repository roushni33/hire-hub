import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Make sure the path is correct
import jobSlice from './jobSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,  // Add the authReducer to the store under 'auth'
        jobs: jobSlice
    },
});

export default store;
