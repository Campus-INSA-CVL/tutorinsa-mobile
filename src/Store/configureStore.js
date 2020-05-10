import { createStore, combineReducers } from 'redux'
import authFunctions from './Reducers/authReducer'
import apiFunctions from './Reducers/apiReducer'

export default createStore(combineReducers({
  authFunctions,
  apiFunctions
}))
