import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";
import { URL } from '../const';
import { Regions } from '../types'
import { QueryGetRegionsParams } from '../types'

export interface InitialStateI {
  fetchedRegions: Regions,
  regionNameFilter: string
}

const initialState: InitialStateI = {
  fetchedRegions: {
    regions: [],
    regionsCount: 0
  },
  regionNameFilter: ''
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
    setRegionNameFilter(state, action: PayloadAction<string>) {
      state.regionNameFilter = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegions.fulfilled, (state, action) => {
        state.fetchedRegions = action.payload;
      });
  },
});


export const { setRegionNameFilter } = regionsSlice.actions

export default regionsSlice.reducer;
