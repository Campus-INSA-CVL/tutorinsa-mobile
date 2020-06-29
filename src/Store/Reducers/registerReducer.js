
const initialStepperState = {
  currentStep: 0,
  setStep: () => {}
};

const initialRegisterState = {
  register_complete: false
};

export function registerFunctions(state = initialRegisterState, action) {
  switch (action.type) {
    case "REGISTER_COMPLETE":
      return { ...state, register_complete: true };

    case "REGISTER_RESET":
      return { ...state, register_complete: false };

    default:
      return state;
  }
}

export function stepperFunctions(state = initialStepperState, action) {
  switch (action.type) {
    case "STEPPER_SET":
      return { ...state, currentStep: action.value };

    case "STEPPER_SET_FUNC":
      return { ...state, setStep: action.value };

    case "STEPPER_NEXT":
      return { ...state, currentStep: state.currentStep+1 };

    case "STEPPER_PREV":
      return {
        ...state,
        currentStep: state.currentStep==0 ? 0 : state.currentStep-1
      };

    case "STEPPER_RESET":
      return { ...state, currentStep: 0 };

    default:
      return state;
  }
}
