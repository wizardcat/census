export type QueryGetRegionsParams = {
    lastId: number,
    skip: number,
    take: number,
    locale: string
}

export type Census = {
    id: number,

    lang: {
        id: number,
        name: string,
        langGroup: {
            id: number,
            name: string,
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
        name: string,
        parentId: number
    }

export type Regions = { regions: Region[], regionsCount: number }
