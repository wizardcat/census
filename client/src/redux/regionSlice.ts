import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { Region } from './actionTypes'

export interface InitialStateI {
    fetchedRegions: Region[],
}

const initialState: InitialStateI = {
    fetchedRegions: [],
}


export const getRegions = createAsyncThunk(
    'region/fetchRegions',
    async (_, thunkAPI) => {
        try {
            let lang = 'ru'
            const response = await axios.get(`http://localhost:3001/${lang}/regions`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const regionSlice = createSlice({
    name: 'region',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRegions.fulfilled, (state, action) => {
                state.fetchedRegions = action.payload;
            });
    },
});

export default regionSlice.reducer;
