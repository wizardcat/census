import { locales, storageKey } from '@app/constants';
import { getFromStorage, saveToStorage } from '@app/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLocale: getFromStorage(storageKey.LOCALE) || locales.ENGLISH,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },

    setCurrentLocale: (state, action) => {
      saveToStorage(storageKey.LOCALE, action.payload);

      return { ...state, currentLocale: action.payload };
    },
  },
});

export const { setCurrentLocale } = localeSlice.actions;

export default localeSlice.reducer;
