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

export const locales = {
  UKRAINIAN: 'uk',
  ENGLISH: 'en',
  RUSSIAN: 'ru',
};

export const storageKey = {
  LOCALE: 'locale',
  CURRENT_REGION_ID: 'currentRegionId',
};

export const languageReplace = {
  ukrainian: {
    wordForms: ['Малоруська', 'Malorussian', 'Малорусский'],
    intlId: 'languageReplace.ukrainian',
  },
  russian: {
    wordForms: ['Російська', 'Russian', 'Русский'],
    intlId: 'languageReplace.eastSlavicGroup',
  },
};
