export type Document = {
  id: number;
  nameUK: string | null;
  nameEN: string | null;
  nameRU: string;
};

export type Region = {
  id: number;
  parentId: number;
  nameUK: string | null;
  nameEN: string | null;
  nameRU: string;
  documentId: number;
  regionSourceId: string;
};

export type LanguageGroup = {
  id: number;
  nameUK: string | null;
  nameEN: string | null;
  nameRU: string;
};

export type Language = {
  id: number;
  nameUK: string | null;
  nameEN: string | null;
  nameRU: string;
  languageGroupId: number;
};

export type CensusRecord = {
  id?: number;
  males: number;
  females: number;
  languageId: number;
  regionId: number;
};

export type CensusPageData = {
  censusByReg: CensusRecord[];
  languageGroups: LanguageGroup[];
  languages: Language[];
};

export type GetRegionParams = {
  lastId: string;
  skip: string;
  take: string;
  region?: string;
};
