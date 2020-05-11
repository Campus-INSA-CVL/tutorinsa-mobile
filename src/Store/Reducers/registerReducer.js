
const initialState = {
  register_complete: false
};

function registerFunctions(state = initialState, action) {
  switch (action.type) {
    case "REGISTER_COMPLETE":
      return { ...state, register_complete: true };

    case "REGISTER_RESET":
      return { ...state, register_complete: false };

    default:
      return state;
  }
}

export default registerFunctions
