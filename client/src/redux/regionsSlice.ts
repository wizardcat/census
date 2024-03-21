import { config } from '@app/constants';
import { QueryGetRegionsParams, Regions } from '@app/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface InitialState {
  fetchedRegions: Regions;
  regionNameFilter: string;
}

const initialState: InitialState = {
  fetchedRegions: {
    regions: [],
    regionsCount: 0,
  },
  regionNameFilter: '',
};

const url = config.url.BASE_URL;

export const getRegions = createAsyncThunk(
  'regions/fetchRegions',
  async (params: QueryGetRegionsParams, thunkAPI) => {
    try {
      const paramsList = Object.keys(params)
        .map((key) => key + '=' + params[key as keyof QueryGetRegionsParams])
        .join('&');
      const response = await axios.get(`${url}/api/regions/?${paramsList}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getRegionsCountByName = createAsyncThunk(
  'regions/fetchRegionsCountByName',
  async (regName: string, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/api/regions/?regName=${regName}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setRegionNameFilter(state, action: PayloadAction<string>) {
      state.regionNameFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRegions.fulfilled, (state, action) => {
      state.fetchedRegions = action.payload;
    });
  },
});

export const { setRegionNameFilter } = regionsSlice.actions;

export default regionsSlice.reducer;
