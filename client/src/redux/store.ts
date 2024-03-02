import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import censusReducer from './censusSlice';
import localReducer from './localesSlice';
import regionReducer from './regionsSlice';

export const store = configureStore({
  reducer: {
    region: regionReducer,
    census: censusReducer,
    locale: localReducer,
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
