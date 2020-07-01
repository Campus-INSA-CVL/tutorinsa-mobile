import { AsyncStorage } from 'react-native';

const LIGHT = {
  name: 'Light',
  background: '#eee',
  foreground: 'white',
  separator: 'black',
  title: 'black',
  subtitle: '#999',
  text: 'black',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'dark-content',
}

const DARK = {
  name: 'Dark',
  background: '#333',
  foreground: '#222',
  separator: 'white',
  title: 'white',
  subtitle: '#8a8a8a',
  text: 'white',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'light-content',
}

const BLUE = {
  name: 'Blue',
  background: '#404452',
  foreground: '#333743',
  separator: 'white',
  title: 'white',
  subtitle: '#8a8a8a',
  text: 'white',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'light-content'
}

const initialState = {
  theme: LIGHT,
  allThemes: [LIGHT, DARK, BLUE]
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
