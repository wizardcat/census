export type Census = {
    id: number,

    lang: {
        id: number,
        name_ua: string,
        name_en: string,
        name_ru: string,
        langGroup: {
            id: number,
            name_ua: string,
            name_en: string,
            name_ru: string
        },
    },
    males: number | null,
    females: number | null,
    regionId: number,
}

export type Censuses = Census[]

export type Region =
    {
        id: number,
        name_ua: string,
        name_en: string,
        name_ru: string
    }

export type Regions = Region[]
