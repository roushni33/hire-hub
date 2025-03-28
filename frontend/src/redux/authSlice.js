import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false, // Default loading state
        user: null, // Default user state
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload; // Set loading to the payload value (true/false)
        },

        setUser: (state, action) => {
            state.user = action.payload; // Set user to the payload value
        },
    },
});

export const { setLoading , setUser } = authSlice.actions; // This exports the action
export default authSlice.reducer; // Default export for the reducer
