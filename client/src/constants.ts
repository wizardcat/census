const prod = {
  url: {
    BASE_URL: 'http://54.208.60.244:5000',
  },
};

const dev = {
  url: {
    BASE_URL: 'http://localhost:5000',
  },
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

export const LOCALES = {
  UKRAINIAN: 'uk',
  ENGLISH: 'en',
  RUSSIAN: 'ru',
};

export const STORAGE_KEY = 'locale';

export const LANGUAGES_FOR_FIX = {
  ukrainian: {
    wordForms: ['Малоруська', 'Malorussian', 'Малорусский'],
    intlId: 'langFix.ukrainian',
  },
  russian: {
    wordForms: ['Російська', 'Russian', 'Русский'],
    intlId: 'langFix.eastSlavicGroup',
  },
};
