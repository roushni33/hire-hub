import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false, // Default loading state
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload; // Set loading to the payload value (true/false)
        },
    },
});

export const { setLoading } = authSlice.actions; // This exports the action
export default authSlice.reducer; // Default export for the reducer
