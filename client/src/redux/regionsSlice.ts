import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { URL } from '../const';
import { Regions } from '../types'
import { QueryGetRegionsParams } from '../types'

export interface InitialStateI {
    fetchedRegions: Regions,
}

const initialState: InitialStateI = {
    fetchedRegions: {
        regions: [],
        regionsCount: 0
    },
}


export const getRegions = createAsyncThunk(
    'regions/fetchRegions',
    async (params: QueryGetRegionsParams, thunkAPI) => {
        try {
            const paramsList = Object.keys(params).map((key) => key + '=' + params[key as keyof QueryGetRegionsParams]).join('&');
            const response = await axios.get(`${URL}/regions/?${paramsList}`);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getRegionsCountByName = createAsyncThunk(
    'regions/fetchRegionsCountByName',
    async (regName: string, thunkAPI) => {
        try {
            const response = await axios.get(`${URL}/regions/?regName=${regName}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const regionsSlice = createSlice({
    name: 'regions',
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




export default regionsSlice.reducer;
