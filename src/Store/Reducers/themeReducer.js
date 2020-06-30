import { AsyncStorage } from 'react-native';

const LIGHT = {
  name: 'Light',
  background: 'white',
  foreground: '#eee',
  separator: 'black',
  title: 'black',
  subtitle: '#999',
  text: 'black',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
}

const DARK = {
  name: 'Dark',
  background: '#222',
  foreground: '#333',
  separator: 'white',
  title: 'white',
  subtitle: '#8a8a8a',
  text: 'white',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
}

const BLUE = {
  name: 'Dark',
  background: '#333743',
  foreground: '#404452',
  separator: 'white',
  title: 'white',
  subtitle: '#8a8a8a',
  text: 'white',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
}

const initialState = {
  theme: LIGHT
};

function themeFunctions(state = initialState, action) {
  switch (action.type) {
    case "THEME_LIGHT":
      return { ...state, theme: LIGHT };
    case "THEME_DARK":
      return { ...state, theme: DARK };
    case "THEME_BLUE":
      return { ...state, theme: BLUE };
    default:
      return state;
  }
}

export default themeFunctions
