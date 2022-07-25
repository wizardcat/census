import { combineReducers } from 'redux'
import { censusReducer } from './censusReducer'
import { regionsReducer } from './regionsReducer'

export const rootReducer = combineReducers({
  censusRows: censusReducer,
  regs: regionsReducer,
})
