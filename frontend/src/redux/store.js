import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Make sure the path is correct
import jobSlice from './jobSlice'
import companySlice from './companySlice'
import applicationSlice from './applicationSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,  // Add the authReducer to the store under 'auth'
        jobs: jobSlice,
        company: companySlice,
        application : applicationSlice

    },
});

export default store;
