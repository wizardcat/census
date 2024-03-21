import { config } from '@app/constants';
import { Census } from '@app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface InitialState {
  fetchedCensus: Census[];
}

const initialState: InitialState = {
  fetchedCensus: [],
};

const url = config.url.BASE_URL;

type Params = { locale: string; regionId: number };

export const getCensusByRegionId = createAsyncThunk(
  'census/fetchCensus',
  async (params: Params, thunkAPI) => {
    try {
      const paramsList = Object.keys(params)
        .map((key) => key + '=' + params[key as keyof Params])
        .join('&');
      const response = await axios.get(`${url}/api/census/?${paramsList}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// type CensusByRegionNameParams = { locale: string, region: string }

// export const getCensusByRegionName = createAsyncThunk(
//   'census/fetchCensusByRegionName',
//   async (params: CensusByRegionNameParams, thunkAPI) => {
//     try {
//       const paramsList = Object.keys(params).map((key) => key + '=' + params[key as keyof CensusByRegionNameParams]).join('&')
//       const response = await axios.get(`${HOST}/census/by-name/?${paramsList}`);
// // console.log(response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const censusSlice = createSlice({
  name: 'census',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCensusByRegionId.fulfilled, (state, action) => {
      state.fetchedCensus = action.payload;
    });
    // .addCase(getCensusByRegionName.fulfilled, (state, action) => {
    //   state.fetchedCensus = action.payload;
    // });
  },
});

export default censusSlice.reducer;
