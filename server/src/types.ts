export type Region = {
  id: number;
  parentId: number;
  name_uk: string | null;
  name_en: string | null;
  name_ru: string | null;
  censusDocumentId: number;
};

export type LanguageGroup = {
  id: number;
  name_uk: string | null;
  name_en: string | null;
  name_ru: string | null;
};

export type Language = {
  id: number;
  name_uk: string | null;
  name_en: string | null;
  name_ru: string | null;
  langGroupId: number;
};

export type CensusRecord = {
  id?: number;
  males: number;
  females: number;
  langId: number;
  regionId: number;
};

export type CensusPageData = {
  censusByReg: CensusRecord[];
  langGroups: LanguageGroup[];
  languages: Language[];
};