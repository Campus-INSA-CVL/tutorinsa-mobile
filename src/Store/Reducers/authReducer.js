
const initialState = { auth_success: false, authStackNavigation: null };

function authFunctions(state = initialState, action) {
  switch (action.type) {
    case "AUTH_TRUE":
      return { ...state, auth_success: true };

    case "AUTH_FALSE":
      return { ...state, auth_success: false };

    case "SET_AUTH_NAVIGATION":
      return { ...state, authStackNavigation: action.value };

    default:
      return state;
  }
}

export default authFunctions
