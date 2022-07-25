import { FETCH_REGIONS, SHOW_ALERT, HIDE_ALERT } from './types'
import { mockRegions } from '../../mock'

export const fetchRegions = () => {
  return async dispatch => {
    try {
      setTimeout(() => {
        let regions = mockRegions

        dispatch({ type: FETCH_REGIONS, payload: regions })
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
