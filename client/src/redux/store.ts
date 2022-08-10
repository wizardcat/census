import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import regionReducer from './regionSlice';
import censusReducer from './censusSlice';

export const store = configureStore({
  reducer: {
    region: regionReducer,
    census: censusReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


