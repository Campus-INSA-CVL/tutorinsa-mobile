
const initialState = {
  user: null,
  subjects: null,
  years: null,
  departments: null,
  rooms: null,
  filter: null
};

function apiFunctions(state = initialState, action) {
  switch (action.type) {

    case "API_USER":
      return { ...state, user: action.value };

    case "API_SUBJECTS":
      const subjects = action.value.map(subject => ({
        "_id": subject._id,
        "name": subject.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
      }))
      return { ...state, subjects: subjects };

    case "API_YEARS":
      const years = action.value.map(year => ({
        "_id": year._id,
        "name": year.name.toUpperCase()
      }))
      return { ...state, years: years };

    case "API_DEPARTMENTS":
      const departments = action.value.map(department => ({
        "_id": department._id,
        "name": department.name.toUpperCase()
      }))
      return { ...state, departments: departments };

    case "API_ROOMS":
      return { ...state, rooms: action.value };

    case "POST_FILTER":
      return { ...state, filter: action.value};

    default:
      return state;
  }
}

export default apiFunctions
