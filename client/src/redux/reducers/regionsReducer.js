import { FETCH_REGIONS } from '../actions/types'

const initialState = {
  fetchedRegions: [],
}

export const regionsReducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case FETCH_REGIONS: {
        return { ...state, fetchedRegions: action.payload }
      }
      default:
        return state
    }
  } catch (e) {
    console.log('Regions problem')
  }
}
