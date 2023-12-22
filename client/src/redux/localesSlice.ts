import { createSlice } from '@reduxjs/toolkit';
import { LOCALES, STORAGE_KEY } from '../constants';
import { getFromStorage, saveToStorage } from '../utils/localStorage';

const initialState = {
  locale: getFromStorage(STORAGE_KEY) || LOCALES.ENGLISH,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },

    addLocale: (state, action) => {
      saveToStorage(STORAGE_KEY, action.payload);

      return { ...state, locale: action.payload };
    },

    getLocale: (state, action) => {
      return {
        locale: state.locale || getFromStorage(STORAGE_KEY) || LOCALES.ENGLISH,
      };
    },
  },
});

export const { addLocale, getLocale } = localeSlice.actions;

export default localeSlice.reducer;
