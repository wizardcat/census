import { locales, storageKey } from '@app/constants';
import { getFromStorage, saveToStorage } from '@app/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locale: getFromStorage(storageKey.LOCALE) || locales.ENGLISH,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },

    setLocale: (state, action) => {
      saveToStorage(storageKey.LOCALE, action.payload);

      return { ...state, locale: action.payload };
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
