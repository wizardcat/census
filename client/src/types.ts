// export enum Locale {
//   ukrainian = 'uk',
//   english = 'en',
//   russian = 'ru',
// }

export type SortOrder = 'asc' | 'desc';

export type QueryGetRegionsParams = {
  lastId: number;
  skip: number;
  take: number;
  locale: string;
  region?: string;
};

export type Census = {
  id: number;
  language: {
    id: number;
    name: string;
    languageGroup: {
      id: number;
      name: string;
    };
  };
  males: number | null;
  females: number | null;
  regionId: number;
};

export type CensusData = Census[];

export type Region = {
  id: number;
  name: string;
  parentId: number;
  documentId: number;
};

export type Regions = { regions: Region[]; regionsCount: number };
