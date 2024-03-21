import { storageKey } from '@app/constants';
import { getFromStorage, saveToStorage } from '@app/utils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  regionNameFilter: string;
  currentRegionId: number;
}

const initialState: InitialState = {
  regionNameFilter: '',
  currentRegionId: getFromStorage(storageKey.CURRENT_REGION_ID) || 0,
};

export const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },
    setCurrentRegionId: (state, action) => {
      saveToStorage(storageKey.CURRENT_REGION_ID, action.payload);

      return { ...state, currentRegionId: action.payload };
    },
    setRegionNameFilter(state, action: PayloadAction<string>) {
      state.regionNameFilter = action.payload;
    },
  },
});

export const { setCurrentRegionId, setRegionNameFilter } = regionsSlice.actions;

export default regionsSlice.reducer;
