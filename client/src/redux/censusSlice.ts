import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { Census } from './actionTypes'

export interface InitialStateI {
    fetchedCensus: Census[],
}

const initialState: InitialStateI = {
    fetchedCensus: [],
}

export const getCensus = createAsyncThunk(
    'census/fetchCensus',
    async (regionId: number, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:3001/census/` + regionId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const censusSlice = createSlice({
    name: 'census',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCensus.fulfilled, (state, action) => {
                state.fetchedCensus = action.payload;
            });
    },
});

export default censusSlice.reducer;
