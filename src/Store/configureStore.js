import { createStore, combineReducers } from 'redux'
import authFunctions from './Reducers/authReducer'
import apiFunctions from './Reducers/apiReducer'
import registerFunctions from './Reducers/registerReducer'

export default createStore(combineReducers({
  authFunctions,
  apiFunctions,
  registerFunctions,
}))
