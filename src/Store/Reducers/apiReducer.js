
const initialState = {
  user: null,
  subjects: null,
  years: null,
  departments: null,
};

function apiFunctions(state = initialState, action) {
  switch (action.type) {
    case "API_USER":
      return { ...state, user: action.value };
    case "API_SUBJECTS":
      return { ...state, subjects: action.value };
    case "API_YEARS":
      return { ...state, years: action.value };
    case "API_DEPARTMENTS":
      return { ...state, departments: action.value };
    default:
      return state;
  }
}

export default apiFunctions
