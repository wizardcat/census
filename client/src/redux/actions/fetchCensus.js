import { FETCH_CENSUS, SHOW_ALERT, HIDE_ALERT } from './types'
import { mockData } from '../../mock'

export const fetchCensus = regionId => {
  return async dispatch => {
    try {
      setTimeout(() => {
        let censusData = mockData.filter(e => e.regionId === regionId)

        dispatch({ type: FETCH_CENSUS, payload: censusData })
      }, 500)
    } catch (e) {
      dispatch(showAlert('Something went wrong!'))
    }
  }
}

export function showAlert(text) {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    })
    setTimeout(() => dispatch(hideAlert()), 3000)
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  }
}
