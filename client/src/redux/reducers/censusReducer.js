import { FETCH_CENSUS } from '../actions/types'

const initialState = {
  fetchedCensus: [],
}

export const censusReducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case FETCH_CENSUS: {
        return { ...state, fetchedCensus: action.payload }
      }
      default:
        return state
    }
  } catch (e) {
    console.log('Census Reducer bug')
  }
}
