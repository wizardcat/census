// export const FETCH_CENSUS = 'FETCH_CENSUS'
// export const FETCH_REGIONS = 'FETCH_REGIONS'
// export const SHOW_ALERT = 'SHOW_ALERT'
// export const HIDE_ALERT = 'HIDE_ALERT'


export type Census = {
    id: number,
    langGroup: {
        id: number,
        name: string
    },
    lang: {
        id: number,
        name: string
    },
    males: number | null,
    females: number | null,
    regionId: number,
}

export type Censuses = Census[]

// export interface fetchCensus {
//     type: typeof FETCH_CENSUS,
//     payload: Census[]
// }


export type Region =
    { id: number, name: string }

export type Regions = Region[]


// export interface fetchRegions {
//     type: typeof FETCH_REGIONS,
//     payload: Regions
// }

// export interface showAlert {
//     type: typeof SHOW_ALERT
// }

// export interface hideAlert {
//     type: typeof HIDE_ALERT
// }

// export type CensusTypes = fetchCensus
// export type RegionTypes = fetchRegions
// export type AlertTypes = showAlert | hideAlert