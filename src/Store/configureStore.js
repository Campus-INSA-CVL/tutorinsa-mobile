import { createStore, combineReducers } from 'redux'
import authFunctions from './Reducers/authReducer'
import apiFunctions from './Reducers/apiReducer'
import { registerFunctions, stepperFunctions } from './Reducers/registerReducer'
import themeFunctions from './Reducers/themeReducer'

export default createStore(combineReducers({
  authFunctions,
  apiFunctions,
  registerFunctions,
  stepperFunctions,
  themeFunctions,
}))
