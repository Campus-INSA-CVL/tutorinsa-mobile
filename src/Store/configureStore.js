import { createStore, combineReducers } from 'redux'
import authFunctions from './Reducers/authReducer'
import apiFunctions from './Reducers/apiReducer'
import registerFunctions from './Reducers/registerReducer'
import themeFunctions from './Reducers/themeReducer'

export default createStore(combineReducers({
  authFunctions,
  apiFunctions,
  registerFunctions,
  themeFunctions,
}))
