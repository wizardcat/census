import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { URL } from '../const';
import { Census } from '../types'

export interface InitialStateI {
    fetchedCensus: Census[],
}

const initialState: InitialStateI = {
    fetchedCensus: [],
}

type Params = { locale: string, regionId: number }

export const getCensus = createAsyncThunk(
    'census/fetchCensus',
    async (params: Params, thunkAPI) => {
        try {
            const paramsList = Object.keys(params).map((key) => key + '=' + params[key as keyof Params]).join('&')
            const response = await axios.get(`${URL}/census/?${paramsList}`);

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
