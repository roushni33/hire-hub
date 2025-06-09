import { createSlice } from "@reduxjs/toolkit";

const comapnaySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies:[],
        searchCompanyByText:"",

    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload;
        },

        setSearchCompanyByText : (state,action) => {
            state.searchCompanyByText = action.payload;
        }
       
    }
});

export const { setSingleCompany , setCompanies , setSearchCompanyByText } = comapnaySlice.actions;

export default comapnaySlice.reducer;
